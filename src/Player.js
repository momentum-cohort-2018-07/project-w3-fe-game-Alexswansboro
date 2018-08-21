import Keyboarder from './keyboarder'
import Bullet from './bullet'
import { colliding } from './colliding.js/'
import { colors, context, screenSize } from './constants.js'

class Player {
  constructor (game) {
    this.center = {
      x: screenSize.x / 2 - 10,
      y: 450
    }
    this.size = {
      x: 20,
      y: 20
    }
    this.keyboarder = new Keyboarder()
    this.game = game
  }
  draw () {
    context.fillStyle = colors.player
    context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
  }
  update () {
    if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
      if (this.center.x <= 0) this.center.x = 0
    }
    if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
      if (this.center.x >= 480) this.center.x = 480
    }
    if (this.keyboarder.isDown(Keyboarder.KEYS.S)) {
      this.game.bullets.push(new Bullet(this.center.x))
    }
    this.game.aliens.forEach((alien) => {
      if (colliding(this, alien)) {
        this.game.gameOver = true
      }
    })
  }
}
export default Player
