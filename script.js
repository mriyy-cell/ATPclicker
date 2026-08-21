// ==========================================
// 1. 変数の準備（数値の設定）
// ==========================================
let atp = 0;               // 現在のATP所持数
let aps = 0;               // 毎秒自動で増えるATP (ATP Per Second)
let clickPower = 1;        // 【条件1用】1クリックで増えるATPの量

let mitoCount = 0;         // 持っているミトコンドリアの数
let mitoCost = 10;         // ミトコンドリアの購入価格

// HTML上の要素を取得（JavaScriptから操作できるようにする）
const atpDisplay = document.getElementById('atp-display');
const apsDisplay = document.getElementById('aps-display');
const clickPowerDisplay = document.getElementById('click-power-display');
const mitoCountDisplay = document.getElementById('mito-count');
const mitoCostDisplay = document.getElementById('mito-cost');

const clickBtn = document.getElementById('click-btn');
const buyMitoBtn = document.getElementById('buy-mito');


// ==========================================
// 2. イベント処理（手動クリック & 条件分岐購入）
// ==========================================

// 【条件1】atp += 1; （クリック時の増加命令）
clickBtn.addEventListener('click', () => {
  atp += clickPower; // 指定した値（初期値1）ずつATPを増やす
  updateGame();
});

// 【条件3】if (atp >= mitoCost) （購入可能かどうかの条件分岐）
buyMitoBtn.addEventListener('click', () => {
  // 条件：もし「現在のATP」が「ミトコンドリアのコスト」以上なら買う
  if (atp >= mitoCost) {
    atp -= mitoCost;                        // コスト分のATPを消費
    aps += 1;                               // 毎秒の増加量(APS)を+1
    mitoCount += 1;                         // 所持数を+1
    mitoCost = Math.floor(mitoCost * 1.15); // 次回の価格を1.15倍にする（切り捨て）
    updateGame();
  }
});


// ==========================================
// 3. タイマー処理（自動増加）
// ==========================================

// 【条件2】setInterval(..., 1000); （1秒ごとの自動実行タイマー）
setInterval(() => {
  atp += aps; // 毎秒の合成量(aps)の分だけATPを増やす
  updateGame();
}, 1000); // 1000ミリ秒 = 1秒


// ==========================================
// 4. 画面表示の更新処理
// ==========================================
function updateGame() {
  // 数字の表示を更新
  atpDisplay.textContent = atp;
  apsDisplay.textContent = aps;
  clickPowerDisplay.textContent = clickPower;
  mitoCountDisplay.textContent = mitoCount;
  mitoCostDisplay.textContent = mitoCost;

  // 【条件3の応用】所持ATPがコスト未満ならボタンを押せない(disabled)ようにする
  if (atp < mitoCost) {
    buyMitoBtn.disabled = true;
  } else {
    buyMitoBtn.disabled = false;
  }
}

// ページを開いた時に最初の画面状態をセット
updateGame();
