// グローバルに展開
/*
 * メイン
 */
var player;
var rect;
var shield

phina.define('Main', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    })

    // 背景
    Sprite('background').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //this.backgroundColor = "#000000";
    // スコア
    this.score = 0
    this.scoreLabel = Label({
      text: this.score,
      fill: '#ffffff',
      fontFamily: "PixelMplus10",
    }).addChildTo(this)
    this.scoreLabel.x = this.gridX.center()
    this.scoreLabel.y = this.gridY.span(1)

    this.bombGroup = DisplayElement().addChildTo(this)

    this.player = Sprite('player', 40, 60).addChildTo(this)
    this.player.setPosition(320, PLAYER_POSITION)
    // プレイヤー
		//player = HeartShape({
    //  fill: "red",
    //  stroke: "black",
    //}).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());
    //this.player.setPosition(this.gridX.center(), this.gridY.center())
    //this.player.setPosition(320, PLAYER_POSITION)
    
    //var startRot = 0; // ターゲット回転開始時の角度
    //var targetToPointStartTheta = 0; // 
    //var RECT_SIZE = 32;

    //// 半径・位置を計算
    //var r = (player.width/2 + RECT_SIZE/2) * Math.sqrt(2);
    //var theta = (45 + 2 * 90).toRadian();
    //var x = 0
    //var y = r * Math.sin(theta)    
    ////var x = r * Math.cos(theta)
    ////var y = r * Math.sin(theta)    


    //rect = Shield().addChildTo(this)
    //  .setPosition(this.gridX.center(),this.gridY.center())
    //  .setInteractive(true)
    //  .on('pointstart', function(e) {
    //    var p = e.pointer;
    //    startRot = rect.rotation;
    //    targetToPointStartTheta = Math.atan2(p.y-player.y, p.x-player.x);
    //  })
    //  .on('pointmove', function(e) {
    //    var p = e.pointer;
    //    var targetToPointCurrentTheta = Math.atan2(p.y-player.y, p.x-player.x);
    //    var thetaDelta = targetToPointCurrentTheta - targetToPointStartTheta;
    //    rect.rotation = startRot + thetaDelta.toDegree();
    //  })
    //  .on('pointend', function(e) {
    //    // 回転後、何かする場合ここに書く
    //  })

  },
	// 毎フレーム更新処理
	update(app) {
		const p = app.pointer
		if (p.getPointing()) {
			if (p.x < 0) {
        this.player.setPosition(0, PLAYER_POSITION)
      } else if (p.x > 640) {
        this.player.setPosition(640, PLAYER_POSITION)
      } else {
        this.player.setPosition(p.x, PLAYER_POSITION)
      }
    }

    this.bombGroup.children.forEach(
      function (bomb) {
        if (this.height < bomb.y) {
          this.score += 1
          this.scoreLabel.text = this.score
          bomb.remove()
        }
        if (this.player.hitTestElement(bomb)) {
          this.gameover()
        }
        //if (bomb.collider.hitTest(shield.collider)) {
        //    this.score += 1
        //    this.scoreLabel.text = this.score
        //    bomb.remove()
        //  }

        //if (player.hitTestElement(bomb)) {
        //  this.gameover()
        //  //console.log("no")
        //}
      }.bind(this)
    )

    if (app.frame % 5 === 0) {
      this.spawnBomb()
    }
  },
  // 爆弾スポーン
  spawnBomb() {
    //const BombType = Math.randint(1, 4)
    //switch (BombType) {
    //  case 1:
    //    BombUp(this.gridX.center(), this.gridY.center(8)).addChildTo(this.bombGroup)
    //    break;
    //  case 2:
    //    BombDown(this.gridX.center(), this.gridY.center(-8)).addChildTo(this.bombGroup)
    //    break;
    //  case 3:
    //    BombLeft(this.gridX.center(8), this.gridY.center()).addChildTo(this.bombGroup)
    //    break;
    //  case 4:
    //    BombRight(this.gridX.center(-8), this.gridY.center()).addChildTo(this.bombGroup)
    //    break;
    //}
    const x = Math.randint(0, this.width)
    const y = -10
    Bomb(x, y).addChildTo(this.bombGroup)
  },
  // ゲームオーバー
  gameover() {
    SoundManager.setVolume(1);
    SoundManager.play('se');
    this.exit({
      score: this.score,
    })
  },
})


/*
 * メイン処理
 */
phina.main(function () {
  // アプリケーションを生成
  const app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
    debug: false,
    startLabel: 'Title',
    scenes: [
      {
        className: 'Title',
        label: 'Title',
        nextLabel: 'Main',
      },
      {
        className: 'Main',
        label: 'Main',
        nextLabel: 'Result',
      },
      {
        className: 'Result',
        label: 'Result',
        nextLabel: 'Main',
      },
    ]
  })

  app.domElement.addEventListener('touchend', function dummy() {
    const s = phina.asset.Sound();
    s.loadFromBuffer();
    s.play().stop();
    app.domElement.removeEventListener('touchend', dummy);
  });

  // 実行
  app.run()
})
