// --- Internationalization Setup ---
// (The LANGUAGES object is now securely imported from the locales/ folder)
const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];

// Fallback to English if the browser language isn't supported
const lang = window.LANGUAGES[browserLang] ? window.LANGUAGES[browserLang] : window.LANGUAGES['en'];

// --- App State ---
let currentRecipe = '46';
let totalWater = 300;
let taste = 'balanced';
let body = 'standard';
let activeStep = null;
let timerInterval = null;
let timeLeft = 30;

const TASTE = {
  acidic: { p1: 2 / 3, p2: 1 / 3 },
  balanced: { p1: 1 / 2, p2: 1 / 2 },
  sweet: { p1: 1 / 3, p2: 2 / 3 },
};

const BODY = {
  light: { pours: 1 },
  standard: { pours: 2 },
  full: { pours: 3 },
};

// ... (KEEP THE REST OF YOUR APP.JS EXACTLY THE SAME FROM HERE ON) ...

// Format mm:ss
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Initial Static Labels Setup
function applyStaticTranslations() {
  document.getElementById('tab-46').textContent = lang.recipe46;
  document.getElementById('tab-ultimate').textContent = lang.recipeUltimate;
  document.getElementById('lbl-water').textContent = lang.waterVolume;
  document.getElementById('lbl-rhythm').textContent = lang.pourRhythm;
  document.getElementById('leg-flavor').innerHTML = `<span class="leg-dot" style="background:var(--gold)"></span>${lang.flavor40}`;
  document.getElementById('leg-strength').innerHTML = `<span class="leg-dot" style="background:var(--sage)"></span>${lang.strength60}`;
}

// Render dynamic recipe controls
function renderControls() {
  const flavorCard = document.getElementById('card-flavor-grind');
  const bodyCard = document.getElementById('card-body-temp');
  
  if (currentRecipe === '46') {
    flavorCard.innerHTML = `
      <p class="label" id="lbl-flavor">${lang.flavorProfile}</p>
      <button class="opt-btn ${taste === 'acidic' ? 'active-gold' : ''}" id="taste-acidic" onclick="setTaste('acidic')">${lang.brightAcidic}</button>
      <button class="opt-btn ${taste === 'balanced' ? 'active-gold' : ''}" id="taste-balanced" onclick="setTaste('balanced')">${lang.balanced}</button>
      <button class="opt-btn ${taste === 'sweet' ? 'active-gold' : ''}" id="taste-sweet" onclick="setTaste('sweet')">${lang.sweet}</button>
    `;
    bodyCard.innerHTML = `
      <p class="label" id="lbl-body">${lang.body}</p>
      <button class="opt-btn ${body === 'light' ? 'active-sage' : ''}" id="body-light" onclick="setBody('light')">${lang.lightBody}</button>
      <button class="opt-btn ${body === 'standard' ? 'active-sage' : ''}" id="body-standard" onclick="setBody('standard')">${lang.standard}</button>
      <button class="opt-btn ${body === 'full' ? 'active-sage' : ''}" id="body-full" onclick="setBody('full')">${lang.fullBody}</button>
    `;
  } else {
    flavorCard.innerHTML = `
      <p class="label">${lang.grindSize}</p>
      <div style="font-family: 'DM Serif Display', serif; font-size: 24px; color: var(--gold); margin-bottom: 8px; margin-top: 4px;">
        ${lang.mediumFine}
      </div>
      <p class="step-note">${lang.evenExtraction}</p>
    `;
    bodyCard.innerHTML = `
      <p class="label">${lang.temp}</p>
      <div style="font-family: 'DM Serif Display', serif; font-size: 24px; color: var(--sage); margin-bottom: 8px; margin-top: 4px;">
        ${lang.hotterBetter}
      </div>
      <p class="step-note">${lang.lightRoasts}</p>
    `;
  }
}

// --- Recipe Calculation Engine ---
function compute() {
  if (currentRecipe === '46') {
    const coffee = Math.round(totalWater / 15);
    const total = totalWater;
    const p1total = total * 0.4;
    const p2total = total * 0.6;
    const tp = TASTE[taste];
    const bp = BODY[body];
    const pour1 = Math.round(p1total * tp.p1);
    const pour2 = Math.round(p1total * tp.p2);
    const p2size = Math.round(p2total / bp.pours);

    const rawSteps = [
      { label: lang.pourLabel(1), sub: lang.subBloom, water: pour1, phase: 1, timer: 30 },
      { label: lang.pourLabel(2), sub: lang.subComplete, water: pour2, phase: 1, timer: 30 },
      ...Array.from({ length: bp.pours }, (_, i) => ({
        label: lang.pourLabel(i + 3),
        sub: lang.subStrength(i + 1, bp.pours),
        water: p2size,
        phase: 2,
        timer: 30
      })),
    ];

    let currentSum = 0;
    let currentTime = 0;

    const steps = rawSteps.map((step, i) => {
      currentSum += step.water;
      if (i === rawSteps.length - 1) {
        const diff = total - currentSum;
        step.water += diff;
        currentSum = total;
      }
      const stepTimeMark = currentTime;
      currentTime += step.timer;

      return { id: i, ...step, cumulative: currentSum, timeMark: stepTimeMark };
    });

    return { coffee, total, steps };
  } else {
    const coffee = Math.round(totalWater * 0.06);
    const total = totalWater;
    
    const bloomWater = Math.round(coffee * 2);
    const pour1Total = Math.round(total * 0.6);
    const pour1Water = pour1Total - bloomWater;
    const pour2Water = total - pour1Total;

    const rawSteps = [
      { label: lang.pourLabel(1), sub: lang.ultBloom, water: bloomWater, phase: 1, timer: 45 },
      { label: lang.pourLabel(2), sub: lang.ultPour1, water: pour1Water, phase: 1, timer: 30 },
      { label: lang.pourLabel(3), sub: lang.ultPour2, water: pour2Water, phase: 2, timer: 30 },
      { label: lang.stirDrawdown, sub: lang.ultDrawdown, water: 0, phase: 2, timer: 105 }
    ];

    let currentSum = 0;
    let currentTime = 0;

    const steps = rawSteps.map((step, i) => {
      currentSum += step.water;
      if (i === rawSteps.length - 1) {
        currentSum = total; 
      }
      const stepTimeMark = currentTime;
      currentTime += step.timer;

      return { id: i, ...step, cumulative: currentSum, timeMark: stepTimeMark };
    });

    return { coffee, total, steps };
  }
}

// Global scope functions for HTML onclick/oninput bindings
window.updateWater = function(val) {
  totalWater = Math.max(0, parseInt(val) || 0);
  render();
};

window.setTaste = function(t) { taste = t; render(); };
window.setBody = function(b) { body = b; render(); };

window.setRecipe = function(recipeId) {
  currentRecipe = recipeId;
  
  document.getElementById('tab-46').className = 'recipe-tab' + (recipeId === '46' ? ' active' : '');
  document.getElementById('tab-ultimate').className = 'recipe-tab' + (recipeId === 'ultimate' ? ' active' : '');
  
  if (recipeId === '46') {
    totalWater = 300;
    document.getElementById('water-val').value = 300;
  } else {
    totalWater = 500;
    document.getElementById('water-val').value = 500;
  }
  
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  activeStep = null;
  render();
};

window.startTimer = function(stepId) {
  if (timerInterval) clearInterval(timerInterval);
  activeStep = stepId;
  const steps = compute().steps;
  const currentStep = steps.find(s => s.id === stepId);
  timeLeft = currentStep ? currentStep.timer : 30;
  
  renderSteps(steps);
  timerInterval = setInterval(() => {
    timeLeft--;
    const btn = document.getElementById('timer-btn-' + stepId);
    if (btn) btn.textContent = timeLeft + 's';
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      if (btn) {
        btn.textContent = '✓ ' + lang.done;
        btn.style.color = 'var(--sage)';
      }
    }
  }, 1000);
};

function renderSteps(steps) {
  const list = document.getElementById('steps-list');
  list.innerHTML = '';
  steps.forEach(step => {
    const color = step.phase === 1 ? 'var(--gold)' : 'var(--sage)';
    const isActive = activeStep === step.id;
    const div = document.createElement('div');
    div.className = 'step-row';
    div.style.borderLeftColor = isActive ? color : color.replace(')', ',0.35)').replace('var(', 'rgba(').replace('--gold', '196,146,42').replace('--sage', '107,155,132');
    
    const waterDisplay = step.water > 0 ? `+${step.water}<span class="step-water-unit">ml</span>` : `—`;

    div.innerHTML = `
      <div style="flex:1">
        <div class="step-title">${step.label}</div>
        <div class="step-sub">${step.sub}</div>
      </div>
      <div style="text-align: right; margin-right: 12px; min-width: 85px;">
        <span class="step-water" style="color:${color}; display: block;">${waterDisplay}</span>
        <div style="font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); margin-top: 2px; line-height: 1.4;">
          ➔ ${step.cumulative}ml<br>
          ⏱ ${formatTime(step.timeMark)}
        </div>
      </div>
      <button id="timer-btn-${step.id}" class="timer-btn"
        style="color:${color};border-color:${color}44"
        onclick="startTimer(${step.id})">↳ ${step.timer}s</button>
    `;
    if (isActive && timerInterval) {
      const btn = div.querySelector('.timer-btn');
      btn.textContent = timeLeft + 's';
      btn.style.background = color + '22';
    }
    list.appendChild(div);
  });
}

function render() {
  const { coffee, total, steps } = compute();
  const maxW = Math.max(...steps.map(s => s.water)) || 1;

  if (currentRecipe === '46') {
    document.getElementById('main-title').textContent = lang.title;
    document.getElementById('main-sub').textContent = lang.sub;
    document.getElementById('lbl-steps').textContent = lang.lblSteps46;
    document.getElementById('main-eyebrow').textContent = "Tetsu Kasuya · World Brewers Cup 2016";
  } else {
    document.getElementById('main-title').textContent = lang.recipeUltimate;
    document.getElementById('main-sub').textContent = lang.ultimateSub;
    document.getElementById('lbl-steps').textContent = lang.lblStepsUltimate;
    document.getElementById('main-eyebrow').textContent = "James Hoffmann · World Barista Champion 2007";
  }

  document.getElementById('coffee-note').textContent = `${coffee}g ${lang.coffeeUnit}`;

  renderControls();

  const bars = document.getElementById('rhythm-bars');
  bars.innerHTML = '';
  steps.forEach(step => {
    const h = step.water > 0 ? Math.max(8, Math.round((step.water / maxW) * 64)) : 4;
    const color = step.phase === 1 ? '#C4922A' : '#6B9B84';
    const heightStyle = step.water > 0 ? `height:${h}px;` : `height:4px; border-top: 1px dashed var(--muted);`;
    const displayWater = step.water > 0 ? step.water : '—';
    
    bars.innerHTML += `<div class="bar-wrap">
      <div class="bar" style="${heightStyle}background:${color};opacity:${activeStep === step.id ? 1 : 0.72}"></div>
      <span class="bar-ml">${displayWater}</span>
    </div>`;
  });

  renderSteps(steps);

  const totalEstimatedTime = steps.reduce((acc, step) => acc + step.timer, 0);
  const activePoursCount = steps.filter(s => s.water > 0).length;

  document.getElementById('summary').innerHTML = [
    [lang.coffee, coffee + 'g'],
    [lang.water, total + 'ml'],
    [lang.pours, activePoursCount],
    [lang.totalTime, formatTime(totalEstimatedTime)],
  ].map(([l, v]) => `<div class="sum-cell"><p class="sum-label">${l}</p><p class="sum-val">${v}</p></div>`).join('');
}

// Initialize Application
applyStaticTranslations();
render();

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('PWA Service Worker registered.'))
      .catch(err => console.log('PWA Registration failed:', err));
  });
}