window.LANGUAGES = window.LANGUAGES || {};

window.LANGUAGES.ja = {
  title: "4:6メソッド",
  sub: "2つの独立したコントロールを備えたV60プアオーバー技術 — 最初の40%で味わい、最後の60%で濃度を調整します。",
  recipe46: "4:6メソッド",
  recipeUltimate: "究極のV60",
  ultimateSub: "クリーンで甘く、一貫した味わいを目指すジェームズ・ホフマン氏の究極のV60テクニック。",
  waterVolume: "湯量",
  coffeeUnit: "コーヒー粉",
  flavorProfile: "味覚プロファイル",
  brightAcidic: "明るい酸味",
  balanced: "バランス",
  sweet: "甘み重視",
  body: "ボディー（コク）",
  lightBody: "ライトボディ",
  standard: "ミディアムボディ",
  fullBody: "ヘビーボディ",
  pourRhythm: "注ぎのリズム",
  flavor40: "味わい (40%)",
  strength60: "濃度 (60%)",
  lblSteps46: "抽出手順 · 93°Cのお湯 · 各注ぎの間に30秒待機",
  lblStepsUltimate: "抽出手順 · 沸騰したお湯 · 指示通りに撹拌・揺らす",
  coffee: "コーヒー粉",
  water: "総湯量",
  pours: "注ぎ回数",
  totalTime: "総時間",
  grindSize: "挽き目",
  temp: "温度",
  hotterBetter: "できるだけ高温",
  mediumFine: "中細挽き",
  evenExtraction: "均一な抽出のために",
  lightRoasts: "特に浅煎りの豆に最適",
  done: "完了",
  pourLabel: (n) => `${n}投目`,
  subBloom: "味わいフェーズ · 蒸らし (ブルーム)",
  subComplete: "味わいフェーズ · 完了",
  subStrength: (curr, total) => {
    if (curr === 1) return "濃度フェーズ · 開始";
    if (curr === total) return "濃度フェーズ · 終了";
    return `濃度フェーズ · ${curr} / ${total}`;
  },
  ultBloom: "蒸らし · 全体に湯が行き渡るようしっかり揺らす",
  ultPour1: "前半 (60%まで) · 高温を維持し、早めの流量で注ぐ",
  ultPour2: "後半 (100%まで) · 残りの湯を少しゆっくり優しく注ぐ",
  ultDrawdown: "落ちきり · 左右に1回ずつスプーンで混ぜ、優しく揺らす",
  stirDrawdown: "落ちきり"
};