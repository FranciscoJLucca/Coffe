window.LANGUAGES = window.LANGUAGES || {};

window.LANGUAGES.pt = {
  title: "O Método 4:6",
  sub: "Uma técnica de extração na V60 com dois controles independentes — sabor nos primeiros 40%, intensidade nos últimos 60%.",
  recipe46: "O Método 4:6",
  recipeUltimate: "V60 Supremo",
  ultimateSub: "A técnica definitiva de James Hoffmann para uma extração limpa, doce e altamente consistente.",
  waterVolume: "Volume de Água",
  coffeeUnit: "de café",
  flavorProfile: "Perfil de sabor",
  brightAcidic: "Brilhante & ácido",
  balanced: "Equilibrado",
  sweet: "Doce",
  body: "Corpo",
  lightBody: "Corpo leve",
  standard: "Corpo médio",
  fullBody: "Corpo pesado",
  pourRhythm: "Ritmo dos despejos",
  flavor40: "Sabor (40%)",
  strength60: "Intensidade (60%)",
  lblSteps46: "Passos do preparo · Água a 93°C · Aguarde 30s entre cada despejo",
  lblStepsUltimate: "Passos do preparo · Água fervendo · Agite e mexa como instruído",
  coffee: "Café",
  water: "Água",
  pours: "Despejos",
  totalTime: "Tempo Total",
  grindSize: "Moagem",
  temp: "Temperatura",
  hotterBetter: "O mais quente",
  mediumFine: "Média-fina",
  evenExtraction: "Para extração uniforme",
  lightRoasts: "Especialmente cafés claros",
  done: "pronto",
  pourLabel: (n) => `Despejo ${n}`,
  subBloom: "Fase de sabor · pré-infusão (bloom)",
  subComplete: "Fase de sabor · finalização",
  subStrength: (curr, total) => {
    if (curr === 1) return "Fase de intensidade · início";
    if (curr === total) return "Fase de intensidade · fim";
    return `Fase de intensidade · ${curr} de ${total}`;
  },
  ultBloom: "Bloom · Agite vigorosamente para molhar todo o pó",
  ultPour1: "1ª Fase (60%) · Despeje fluxo rápido, mantendo temp. alta",
  ultPour2: "2ª Fase (100%) · Fluxo mais lento, despeje com cuidado",
  ultDrawdown: "Drenagem · Mexa horário/anti-horário, gire e deixe escorrer",
  stirDrawdown: "Drenagem"
};