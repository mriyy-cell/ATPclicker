// 変数の準備
let atp = 0;
let aps = 0;
let clickPower = 1; // 1クリックあたりの増加数

let mitoCount = 0;
let mitoCost = 10;

// HTML要素の取得
const atpDisplay = document.getElementById('atp-display');
const apsDisplay = document.getElementById('aps-display');
const clickPowerDisplay = document.getElementById('click-power-display');
const mitoCountDisplay = document.getElementById('mito-count');
const mitoCostDisplay = document.getElementById('mito-cost');

const clickBtn = document.getElementById('click-btn');
const buyMitoBtn = document.getElementById('buy-mito');
const mainActionArea = document.querySelector('.main-action');

// クリック時の処理
clickBtn.addEventListener('click', (event) => {
  atp += clickPower;
  
  // ポップアップ演出 "+○" の生成
  createFloatingText(event, `+${clickPower}`);
  
  updateGame();
});

// ポップアップ数字を作る関数
function createFloatingText(event, text) {
  const floatEl = document.createElement('div');
  floatEl.className = 'floating-number';
  floatEl.textContent = text;

  // クリック位置を取得して配置（画像の中心付近にランダムにバラけさせる）
  const rect = mainActionArea.getBoundingClientRect();
  const offsetX = (Math.random() - 0.5) * 40; // 少し横に散らす
  const x = (event.clientX ? event.clientX - rect.left : rect.width / 2) + offsetX;
  const y = event.clientY ? event.clientY - rect.top : rect.height / 2;

  floatEl.style.left = `${x}px`;
  floatEl.style.top = `${y}px`;

  mainActionArea.appendChild(floatEl);

  // アニメーション終了後に要素を削除
  setTimeout(() => {
    floatEl.remove();
  }, 800);
}

// ミトコンドリア購入処理
buyMitoBtn.addEventListener('click', () => {
  if (atp >= mitoCost) {
    atp -= mitoCost;
    aps += 1;
    mitoCount += 1;
    mitoCost = Math.floor(mitoCost * 1.15);
    updateGame();
  }
});

// 自動加算タイマー (1秒ごと)
setInterval(() => {
  atp += aps;
  updateGame();
}, 1000);

// 画面表示の更新
function updateGame() {
  atpDisplay.textContent = atp;
  apsDisplay.textContent = aps;
  clickPowerDisplay.textContent = clickPower;
  mitoCountDisplay.textContent = mitoCount;
  mitoCostDisplay.textContent = mitoCost;

  if (atp < mitoCost) {
    buyMitoBtn.disabled = true;
  } else {
    buyMitoBtn.disabled = false;
  }
}

updateGame();
