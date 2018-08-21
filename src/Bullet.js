
import { colors, context } from './constants.js'

class Bullet {
  constructor (playerCenterX) {
    this.center = {
      x: playerCenterX,
      y: 445
    }
    this.size = {
      x: 5,
      y: 5
    }
  }
  draw () {
    context.fillStyle = colors.bullets
    context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
  }
  update () {
    this.center.y -= 2
  }
}
export default Bullet
