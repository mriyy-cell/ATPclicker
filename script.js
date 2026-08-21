// --- 変数の準備（ゲームの状態を保持する数字） ---
let atp = 0;               // 現在のATP所持数
let aps = 0;               // 1秒あたり増えるATP (ATP Per Second)
let mitoCount = 0;         // 持っているミトコンドリアの数
let mitoCost = 10;         // ミトコンドリアの価格

// --- HTML上の要素を取得 ---
const atpDisplay = document.getElementById('atp-display');
const apsDisplay = document.getElementById('aps-display');
const clickBtn = document.getElementById('click-btn');
const buyMitoBtn = document.getElementById('buy-mito');
const mitoCostDisplay = document.getElementById('mito-cost');

// 1. クリックした時の処理
clickBtn.addEventListener('click', () => {
  atp += 1;
  updateGame();
});

// 2. ミトコンドリアを買った時の処理
buyMitoBtn.addEventListener('click', () => {
  if (atp >= mitoCost) {
    atp -= mitoCost;                   // ATPを支払う
    aps += 1;                          // 毎秒合成量を+1
    mitoCount += 1;
    mitoCost = Math.floor(mitoCost * 1.15); // 価格を1.15倍にする
    updateGame();
  }
});

// 3. 1秒ごとに自動でATPを増やすタイマー処理 (1000ミリ秒 = 1秒)
setInterval(() => {
  atp += aps;
  updateGame();
}, 1000);

// 4. 画面の表示を更新する処理
function updateGame() {
  atpDisplay.textContent = atp;
  apsDisplay.textContent = aps;
  mitoCostDisplay.textContent = mitoCost;

  // ATPが足りない時は購入ボタンを押せないようにする
  if (atp < mitoCost) {
    buyMitoBtn.disabled = true;
  } else {
    buyMitoBtn.disabled = false;
  }
}

// 最初にも一度画面更新を実行しておく
updateGame();
