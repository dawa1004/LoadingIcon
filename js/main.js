'use strict';
// returnが関数の中でしか使えないので、ブロックで囲まず即時関数で囲う
(() => { // 即時関数
  class IconDrawer { // 描画関連
    constructor(canvas) {
      this.ctx = canvas.getContext('2d'); // 描画コンテキスト
      this.width = canvas.width; // 後で計算しやすくするためプロパティで保持
      this.height = canvas.height;
      this.r = 60; // 円の半径
    }
    draw(angle) { // 描画のためのメソッド
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // 半透明の白を
      this.ctx.fillRect(0, 0, this.width, this.height); // 塗りつぶしメソッド 領域全体

      this.ctx.save(); // 座標空間を保存

      this.ctx.translate(this.width / 2, this.height / 2); // 円の中心まで座標空間をずらす
      this.ctx.rotate(Math.PI / 180 * angle); // 座標空間を30度ずらして描画

      this.ctx.beginPath();
      this.ctx.moveTo(0, -this.r - 5); //0, 0から上方向にrいって更に上に少しいく
      this.ctx.lineTo(0, -this.r + 5); // 線を引く ちょっと下
      this.ctx.strokeStyle = 'orange'; // 線の色をオレンジに
      this.ctx.lineWidth = 6; // 先の太さ
      this.ctx.stroke(); // 描画

      this.ctx.restore(); // saveを復元
    }
  }

  class Icon { // クラス作成
    constructor(drawer) {
      this.drawer = drawer;
      this.angle = 0; // 角度
    }

    draw() {
      this.drawer.draw(this.angle);
    }

    update() { // 更新系の処理
      this.angle += 12; // 12度ずつ増やす
    }

    run() {
      this.update();
      this.draw(); // 実行

      setTimeout(() => { // 繰り返し実行
        this.run();
      }, 100); // 100ミリ秒後
    }
  }


  const canvas = document.querySelector('canvas'); // canvas要素取得
  // canvasがサポートされてなければ処理を止める
  if (typeof canvas.getContext == 'undefined') {
    return;
  }


  //クラス構文 インスタンス作成
  const icon = new Icon(new IconDrawer(canvas)); //canvasを渡し描画ができるようにする
  icon.run(); //runメソッドの実行
})();
