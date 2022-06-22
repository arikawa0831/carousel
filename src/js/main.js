import Scroll from './scroll'

document.addEventListener('DOMContentLoaded', () => {

  function init() {
    new Scroll();
  }

  // アンカースクロール
  $('a[href^="#"]').click(function () {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var headerHeight = $('.l-header').outerHeight();
    var position = target.offset().top - headerHeight;
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });

  $(function () {
    //////////////////////////// 【必要な変数を定義】////////////////////////////
    //////////  スライドリストの合計幅を計算→CSSでエリアに代入
    let width = $('.carousel-list').outerWidth(true); // .carousel-listの1枚分の幅
    let length = $('.carousel-list').length; // .carousel-listの数
    let slideArea = width * length; // レール全体幅 = スライド1枚の幅 × スライド合計数
    $('.carousel-area').css('width', slideArea); // カルーセルレールに計算した合計幅を指定
    //////////  スライド現在値と最終スライド
    let slideCurrent = 0; // スライド現在値（1枚目のスライド番号としての意味も含む）
    let lastCurrent = $('.carousel-list').length - 1; // スライドの合計数＝最後のスライド番号
    ////////////////////////////【スライドの動き方+ページネーションに関する関数定義】////////////////////////////
    ////////// スライドの切り替わりを「changeslide」として定義
    function changeslide() {
      $('.carousel-area').stop().animate({ // stopメソッドを入れることでアニメーション1回毎に止める
        left: slideCurrent * -width // 代入されたスライド数 × リスト1枚分の幅を左に動かす
      });
      ////////// ページネーションの変数を定義（＝スライド現在値が必要）
      let pagiNation = slideCurrent + 1; // nth-of-typeで指定するため0に＋1をする
      $('.pagination-circle').removeClass('target'); // targetクラスを削除
      $(".pagination-circle:nth-of-type(" + pagiNation + ")").addClass('target'); // 現在のボタンにtargetクラスを追加
    };
    /////////////////////////【自動スライド切り替えのタイマー関数定義】/////////////////////////
    let Timer;
    ////////// 一定時間毎に処理実行する「startTimer」として関数を定義
    function startTimer() {
      // 変数Timerに下記関数内容を代入する
      Timer = setInterval(function () { // setInterval・・・指定した時間ごとに関数を実行
        if (slideCurrent === lastCurrent) { // 現在のスライドが最終スライドの場合
          slideCurrent = 0;
          changeslide(); // スライド初期値の値を代入して関数実行（初めのスライドに戻す）
        } else {
          slideCurrent++;
          changeslide(); // そうでなければスライド番号を増やして（次のスライドに切り替え）関数実行
        };
      }, 3000); // 上記動作を3秒毎に
    }
    ////////// 「startTimer」関数を止める「stopTimer」関数を定義
    function stopTimer() {
      clearInterval(Timer); // clearInterval・・・setIntervalで設定したタイマーを取り消す
    }
    //////// 自動スライド切り替えタイマーを発動
    startTimer();
    /////////////////////////【ボタンクリック時関数を呼び出し】/////////////////////////
    // NEXTボタン
    $('.js-btn-next').click(function () {
      // 動いているタイマーをストップして再度タイマーを動かし直す（こうしないとページ送り後の秒間隔がズレる）
      stopTimer();
      startTimer();
      if (slideCurrent === lastCurrent) { // 現在のスライドが最終スライドの場合
        slideCurrent = 0;
        changeslide(); // スライド初期値の値を代入して関数実行（初めのスライドに戻す）
      } else {
        slideCurrent++;
        changeslide(); // そうでなければスライド番号を増やして（次のスライドに切り替え）関数実行
      };
    });
    // BACKボタン
    $('.js-btn-back').click(function () {
      // 動いているタイマーをストップして再度タイマーを動かし直す（こうしないとページ送り後の時間間隔がズレる）
      stopTimer();
      startTimer();
      if (slideCurrent === 0) { // 現在のスライドが初期スライドの場合
        slideCurrent = lastCurrent;
        changeslide(); // 最終スライド番号を代入して関数実行（最後のスライドに移動）
      } else {
        slideCurrent--;
        changeslide(); // そうでなければスライド番号を減らして（前のスライドに切り替え）関数実行
      };
    });
  });

  // $(function () {
  //   let width = $('.carousel-list').outerWidth(true); 
  //   let length = $('.carousel-list').length; 
  //   let slideArea = width * length;
  //   $('.carousel-area').css('width', slideArea); 
  //   let slideCurrent = 0; 
  //   let lastCurrent = $('.carousel-list').length - 1; 
  //   function changeslide() {
  //     $('.carousel-area').stop().animate({ 
  //       left: slideCurrent * -width 
  //     });
  //     let pagiNation = slideCurrent + 1; 
  //     $('.pagination-circle').removeClass('target');
  //     $(".pagination-circle:nth-of-type(" + pagiNation + ")").addClass('target');
  //   };
  //   let Timer;
  //   function startTimer() {
  //     Timer = setInterval(function () { 
  //       if (slideCurrent === lastCurrent) {
  //         slideCurrent = 0;
  //         changeslide();
  //       } else {
  //         slideCurrent++;
  //         changeslide();
  //       };
  //     }, 3000);
  //   }
  //   function stopTimer() {
  //     clearInterval(Timer);
  //   }
  //   startTimer();
  //   $('.js-btn-next').click(function () {
  //     stopTimer();
  //     startTimer();
  //     if (slideCurrent === lastCurrent) { 
  //       slideCurrent = 0;
  //       changeslide(); 
  //     } else {
  //       slideCurrent++;
  //       changeslide(); 
  //     };
  //   });
  //   $('.js-btn-back').click(function () {
  //     stopTimer();
  //     startTimer();
  //     if (slideCurrent === 0) {
  //       slideCurrent = lastCurrent;
  //       changeslide();
  //     } else {
  //       slideCurrent--;
  //       changeslide();
  //     };
  //   });
  // });

  init();

});
