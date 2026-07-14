window.LANGUAGES = window.LANGUAGES || {};

window.LANGUAGES.es = {
  title: "El Método 4:6",
  sub: "Una técnica de pour-over V60 con dos controles independientes: sabor en el primer 40%, intensidad en el último 60%.",
  recipe46: "El Método 4:6",
  recipeUltimate: "V60 Definitivo",
  ultimateSub: "La técnica maestra de James Hoffmann para lograr una taza dulce, limpia y balanceada.",
  waterVolume: "Volumen de agua",
  coffeeUnit: "de café",
  flavorProfile: "Perfil de sabor",
  brightAcidic: "Brillante y ácido",
  balanced: "Balanceado",
  sweet: "Dulce",
  body: "Cuerpo",
  lightBody: "Cuerpo ligero",
  standard: "Cuerpo medio",
  fullBody: "Cuerpo pesado",
  pourRhythm: "Ritmo de vertido",
  flavor40: "Sabor (40%)",
  strength60: "Intensidad (60%)",
  lblSteps46: "Pasos de preparación · Agua a 93°C · Esperar 30s entre vertidos",
  lblStepsUltimate: "Pasos de preparación · Agua hirviendo · Agitar y remover",
  coffee: "Café",
  water: "Agua",
  pours: "Vertidos",
  totalTime: "Tiempo Total",
  grindSize: "Molienda",
  temp: "Temperatura",
  hotterBetter: "Lo más caliente",
  mediumFine: "Media-fina",
  evenExtraction: "Para extracción uniforme",
  lightRoasts: "Especialmente cafés claros",
  done: "listo",
  pourLabel: (n) => `Vertido ${n}`,
  subBloom: "Fase de sabor · preinfusión (bloom)",
  subComplete: "Fase de sabor · completado",
  subStrength: (curr, total) => {
    if (curr === 1) return "Fase de intensidad · inicio";
    if (curr === total) return "Fase de intensidad · fin";
    return `Fase de intensidad · ${curr} de ${total}`;
  },
  ultBloom: "Bloom · Agitar con fuerza para humedecer todo el café",
  ultPour1: "1ª Fase (60%) · Vertido rápido, mantener temperatura alta",
  ultPour2: "2ª Fase (100%) · Verter el agua restante, flujo más lento",
  ultDrawdown: "Filtración · Remover horario/anti-horario, girar y escurrir",
  stirDrawdown: "Filtración"
};