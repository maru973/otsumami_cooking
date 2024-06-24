function showModal(message, callback) {
  alert(message);
  if (typeof callback === 'function') {
    callback();
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // ■カウントダウンタイマー
  const $timer=document.getElementById('js-timerTime');
  const $tStart = document.getElementById('js-timerStart');
  const $tStop =document.getElementById('js-timerStop');
  const $tResset =document.getElementById('js-timerResset');
  const $tComplete = document.getElementById('js-timerComplete'); // 新しい完成ボタン
  
  console.log('$tStart:', $tStart);
  console.log('$tStop:', $tStop);
  console.log('$tResset:', $tResset);
  console.log('Turbolinks visit');
  
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
    let cm = String(tTarget.getMinutes()).padStart(2, '0');
    let cs = String(tTarget.getSeconds()).padStart(2, '0');
    
    if(tTarget.getTime() < 0){ // タイマーが終了したかどうかの判定を修正
      console.log('タイマーが終了しました');
      tResset();
      showModal('終わりでーす！手を止めてくださーい！', () => {
        window.location.href = '/failure';
      });
    } else {
      $timer.innerHTML = `${cm}:${cs}`;
      if (tTarget.getMinutes() === 0 && tTarget.getSeconds() === 10) {
        playSuccessSound();
      }
      tCountId = setTimeout(displayCount, 500);
    }
  }

  function playSuccessSound() {
    const audio = new Audio("/sounds/timeout.mp3");
    audio.play();
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

  // 新しい完成ボタンが押されたとき
  $tComplete.addEventListener('click', function() {
    if (tTarget.getTime() > 0) {
      // タイマーがまだ残っている場合は成功ページに遷移
      window.location.href = '/success';
    } else {
      // タイマーが終了している場合は失敗ページに遷移
      window.location.href = '/failure';
    }
  });
  
  function tResset(){
    $tStart.disabled = false;
    $tStop.disabled = true;
    $tResset.disabled = true;
    $timer.textContent = "05:00";
    tStopTime = 0;  
  }
  });
  