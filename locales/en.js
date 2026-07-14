window.LANGUAGES = window.LANGUAGES || {};

window.LANGUAGES.en = {
  title: "The 4:6 Method",
  sub: "A V60 pour-over technique with two independent controls — flavor in the first 40%, strength in the last 60%.",
  recipe46: "O Método 4:6",
  recipeUltimate: "The Ultimate V60",
  ultimateSub: "James Hoffmann's masterclass technique for a sweet, clean, and balanced single-cup pour-over.",
  waterVolume: "Water Volume",
  coffeeUnit: "coffee",
  flavorProfile: "Flavor profile",
  brightAcidic: "Bright & acidic",
  balanced: "Balanced",
  sweet: "Sweet",
  body: "Body",
  lightBody: "Light body",
  standard: "Medium body",
  fullBody: "Heavy body",
  pourRhythm: "Pour rhythm",
  flavor40: "Flavor (40%)",
  strength60: "Strength (60%)",
  lblSteps46: "Brew steps · 93°C water · wait 30s between each pour",
  lblStepsUltimate: "Brew steps · Boiling water · Swirl & stir as directed",
  coffee: "Coffee",
  water: "Water",
  pours: "Pours",
  totalTime: "Total Time",
  grindSize: "Grind size",
  temp: "Temperature",
  hotterBetter: "Boiling / Hot",
  mediumFine: "Medium-fine",
  evenExtraction: "For even extraction",
  lightRoasts: "Especially for light roasts",
  done: "done",
  pourLabel: (n) => `Pour ${n}`,
  subBloom: "Flavor phase · bloom",
  subComplete: "Flavor phase · complete",
  subStrength: (curr, total) => {
    if (curr === 1) return "Strength phase · start";
    if (curr === total) return "Strength phase · finish";
    return `Strength phase · ${curr} of ${total}`;
  },
  ultBloom: "Bloom · Swirl aggressively to wet all grounds",
  ultPour1: "1st Phase (60%) · Pour up to 60%, high temperature",
  ultPour2: "2nd Phase (100%) · Pour remaining water, slower flow",
  ultDrawdown: "Drawdown · Stir CW/CCW, swirl once, let drain",
  stirDrawdown: "Drawdown"
};