import { colliding } from './colliding.js/'
import { context } from './constants.js'
import { getRandomColor } from './randomcolor'
class Alien {
  constructor (game) {
    this.center = {
      x: Math.floor(Math.random() * 500),
      y: 20
    }
    this.size = {
      x: 20,
      y: 20
    }
    this.game = game
    this.color = getRandomColor()
    this.speed = Math.random() * 50
  }
  draw () {
    context.fillStyle = this.color
    context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
  }
  update () {
    this.center.y += this.speed
    if (this.center.y >= 500) {
      this.game.gameOver = true
    }
    this.game.bullets.forEach((bullet, bulletIndex) => {
      this.game.aliens.forEach((alien, alienIndex) => {
        if (colliding(alien, bullet)) {
          this.game.aliens.splice(alienIndex, 1)
        }
        if (this.game.aliens.length < 3) {
          this.game.aliens.push(new Alien())
        }
        if (this.game.aliens.length === 0) {
          this.game.winner = true
        }
      })
    })
  }
}
export default Alien
