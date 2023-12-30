// ■カウントダウンタイマー
const $timer=document.getElementById('js-timerTime');
const $tStart = document.getElementById('js-timerStart');
const $tStop =document.getElementById('js-timerStop');
const $tResset =document.getElementById('js-timerResset');

// 入力値を取得
const $input = document.querySelector('.timer-input input');

// ターゲット時間
let tTarget; //残り時間
let tStartTime; //開始時刻
let tStopTime=0; //停止時間
let tCountId ; //インターバル格納
let setTime; //カウントダウン設定時間

// ターゲット時間をセットし描画
function displayCount(){
  tTarget = new Date(tStartTime + (1000 * setTime) - Date.now() - tStopTime);
  let ch = String(tTarget.getHours() - 9).padStart(2, '0');
  let cm = String(tTarget.getMinutes()).padStart(2, '0');
  let cs = String(tTarget.getSeconds()).padStart(2, '0');
  
  if(tTarget.getTime() < 0){ // タイマーが終了したかどうかの判定を修正
    tResset();
    alert('終了です');
  } else {
    $timer.innerHTML = `${ch}:${cm}:${cs}`;
    tCountId = setTimeout(displayCount, 500);
  }
}

// スタートボタンを押したとき
$tStart.addEventListener('click',()=>{
  $tStart.disabled = true;
  $tStop.disabled = false;
  $tResset.disabled = true;
  setTime =300;
  tStartTime = Date.now();
  displayCount();
});

// ストップボタンを押したとき
$tStop.addEventListener('click',()=>{
  $tStart.disabled = false;
  $tStop.disabled = true;
  $tResset.disabled = false;
  clearTimeout(tCountId);
  tStopTime +=Date.now()-tStartTime;
});

// リセットボタンが押されたとき
$tResset.addEventListener("click", function () {
  tResset();
});

function tResset(){
  $tStart.disabled = false;
  $tStop.disabled = true;
  $tResset.disabled = true;
  $timer.textContent = "00:00:00";
  tStopTime = 0;  
}

export { $timer, $tStart, $tStop, $tResset };