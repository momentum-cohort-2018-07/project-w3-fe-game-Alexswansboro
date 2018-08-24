
import Player from './player'
import Alien from './alien'
import { context, screenSize } from './constants.js'
import { getRandomColor } from './randomcolor'

class Game {
  constructor () {
    this.gameOver = false
    this.winner = false
    this.player = new Player(this)
    this.aliens = [new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this)]
    this.bullets = []
    this.ticks()
  }
  draw () {
    context.clearRect(0, 0, 500, 500)
    this.bullets.forEach(function (bullet) {
      bullet.draw()
    })
    this.aliens.forEach(function (alien) {
      alien.draw()
    })
    this.player.draw()
  }
  ticks () {
    if (this.gameOver) {
      context.textAlign = 'center'
      context.font = '48px Helvetica'
      context.fillStyle = 'black'
      context.fillText('game over', screenSize.x / 2, screenSize.y / 2)
    } else if (this.winner) {
      context.textAlign = 'center'
      context.font = '48px Helvetica'
      context.fillStyle = getRandomColor()
      context.fillText('WINNER', screenSize.x / 2, screenSize.y / 2)
    } else {
      this.update()
      this.draw()
      window.requestAnimationFrame(() => this.ticks())
    }
  }
  update () {
    this.player.update()
    this.aliens.forEach((alien) => {
      alien.update()
    })
    this.bullets.forEach(function (bullet) {
      bullet.update()
    })
  }
  stop () {
    this.context.textAlign = 'center'
    this.context.font = '48px Helvetica'
    this.context.fillStyle = 'black'
    this.context.fillText('game over', this.screenSize.x / 2, this.screenSize.y / 2)
  }
}

export default Game
