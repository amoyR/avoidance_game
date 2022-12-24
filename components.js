function random(min, max) {
  let rand = Math.floor((min + (max - min + 1) * Math.random()));
  return rand;
}

phina.define('Bomb', {
  superClass: 'phina.display.Sprite',

  init(x, y) {
    const randomType = Math.randint(1, 9)
    switch (randomType) {
      case 1:
        this.superInit('arrowRed', 64, 52)
        break;
      case 2:
        this.superInit('arrowOrange', 64, 52)
        break;
      case 3:
        this.superInit('arrowPink', 64, 52)
        break;
      case 4:
        this.superInit('arrowPurple', 64, 52)
        break;
      case 5:
        this.superInit('arrowWhite', 64, 52)
        break;
      case 6:
        this.superInit('arrowYellow', 64, 52)
        break;
      case 7:
        this.superInit('arrowLightBlue', 64, 52)
        break;
      case 8:
        this.superInit('arrowGreen', 64, 52)
        break;
      case 9:
        this.superInit('arrowBlue', 64, 52)
        break;
    }
    const randomAccel = Math.randint(10, 80)
    this.accel = randomAccel
    this.setPosition(x, y)
  },

  update() {
    this.y += this.accel
  },
})

//phina.define('BombUp', {
//  superClass: 'phina.display.Sprite',
//
//  init(x, y) {
//    this.superInit('arrowUp', 64, 52)
//    this.setPosition(x, y)
//    this.collider.show();
//  },
//
//  update() {
//    this.y -= 5
//  },
//})
//
//phina.define('BombDown', {
//  superClass: 'phina.display.Sprite',
//
//  init(x, y) {
//    this.superInit('arrowDown', 64, 52)
//    this.setPosition(x, y)
//    this.collider.show();
//  },
//
//  update() {
//    this.y += 5
//  },
//})
//
//phina.define('BombLeft', {
//  superClass: 'phina.display.Sprite',
//
//  init(x, y) {
//    this.superInit('arrowLeft', 64, 52)
//    this.setPosition(x, y)
//    this.collider.show();
//  },
//
//  update() {
//    this.x -= 5
//  },
//})
//
//phina.define('BombRight', {
//  superClass: 'phina.display.Sprite',
//
//  init(x, y) {
//    this.superInit('arrowRight', 64, 52)
//    this.setPosition(x, y)
//    this.collider.show();
//  },
//
//  update() {
//    this.x += 5
//  },
//})
//
//
