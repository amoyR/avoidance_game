phina.define("Result", {
  superClass: 'DisplayScene',
  init: function(params) {
    // 親クラス初期化
    this.superInit(params);

    // 背景
    Sprite('background').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    // 評価テキスト
    Label({
      text: 'EVALUATE',
      fontSize: 24,
      fill: '#ffffff',
      fontFamily: "PixelMplus10",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(7));

    // 評価
    Label({
      text: 'SCORE：' + params.score,
      fontSize: 48,
      fill: '#ffffff',
      fontFamily: "PixelMplus10",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));

    let result = ''
    if (params.score <= 10) {
      result = '💩'
    } else if (params.score > 10 && params.score <= 30) {
      result = '😕'
    } else if (params.score > 30 && params.score <= 50) {
      result = '😯'
    } else if (params.score > 50 && params.score <= 70) {
      result = '😀'
    } else if (params.score > 70 && params.score <= 90) {
      result = '😏'
    } else if (params.score > 90 && params.score <= 110) {
      result = '😎'
    } else if (params.score > 110 && params.score <= 200) {
      result = '🐄'
    } else if (params.score > 200) {
      result = '👑'
    }

    // ラベル
    Label({
      text: result,
      fontSize: 64,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());


    const play = Button({text: "PLAY", fontFamily: "PixelMplus10", fill: '#000000'})
      .setPosition(this.gridX.center(), this.gridY.span(12))
      .addChildTo(this)
      .on('push', ()=> {
        this.exit()
      });

  }
});

