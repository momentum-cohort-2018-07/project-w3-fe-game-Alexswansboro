import Game from './src/Game'

// class Game {
//   constructor () {
//     this.gameOver = false
//     this.player = new Player(this)
//     this.aliens = [new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this)]
//     this.bullets = []
//     this.tick()
//   }
//   draw () {
//     context.clearRect(0, 0, 500, 500)
//     this.bullets.forEach(function (bullet) {
//       bullet.draw()
//     })
//     this.aliens.forEach(function (alien) {
//       alien.draw()
//     })
//     this.player.draw()
//   }
//   ticks () {
//     if (this.gameOver) {
//       context.textAlign = 'center'
//       context.font = '48px Helvetica'
//       context.fillStyle = 'black'
//       context.fillText('game over', screenSize.x / 2, screenSize.y / 2)
//     } else {
//       this.update()
//       this.draw()
//       requestAnimationFrame(() => this.ticks())
//     }
//   }
//   update () {
//     this.player.update()
//     this.aliens.forEach((alien) => {
//       alien.update()
//     })
//     this.bullets.forEach(function (bullet) {
//       bullet.update()
//     })
//   }
//   stop () {
//     this.context.textAlign = 'center'
//     this.context.font = '48px Helvetica'
//     this.context.fillStyle = 'black'
//     this.context.fillText('game over', this.screenSize.x / 2, this.screenSize.y / 2)
//   }
// }

// class Player {
//   constructor (game) {
//     this.center = {
//       x: screenSize.x / 2 - 10,
//       y: 450
//     }
//     this.size = {
//       x: 20,
//       y: 20
//     }
//     this.keyboarder = new Keyboarder()
//     this.game = game
//   }
//   draw () {
//     context.fillStyle = colors.player
//     context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
//   }
//   update () {
//     if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT)) {
//       this.center.x -= 2
//       if (this.center.x <= 0) this.center.x = 0
//     }
//     if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT)) {
//       this.center.x += 2
//       if (this.center.x >= 480) this.center.x = 480
//     }
//     if (this.keyboarder.isDown(Keyboarder.KEYS.S)) {
//       this.game.bullets.push(new Bullet(this.center.x))
//     }
//     this.game.aliens.forEach((alien) => {
//       if (colliding(this, alien)) {
//         this.game.gameOver = true
//       }
//     })
//   }
// }
// class Alien {
//   constructor (game) {
//     this.center = {
//       x: Math.floor(Math.random() * 500),
//       y: 20
//     }
//     this.size = {
//       x: 20,
//       y: 20
//     }
//     this.game = game
//     this.color = getRandomColor()
//     this.speed = Math.random()
//   }
//   draw () {
//     context.fillStyle = this.color
//     context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
//   }
//   update () {
//     this.center.y += this.speed
//     if (this.center.y >= 500) {
//       this.game.gameOver = true
//     }
//     this.game.bullets.forEach((bullet, bulletIndex) => {
//       this.game.aliens.forEach((alien, alienIndex) => {
//         if (colliding(alien, bullet)) {
//           this.game.aliens.splice(alienIndex, 1)
//         }
//         if (this.game.aliens.length === 0) {
//           this.game.gameOver = true
//         }
//       })
//     })
//   }
// }
// class Bullet {
//   constructor (playerCenterX) {
//     this.center = {
//       x: playerCenterX,
//       y: 445
//     }
//     this.size = {
//       x: 5,
//       y: 5
//     }
//     this.game = game
//   }
//   draw () {
//     context.fillStyle = colors.bullets
//     context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
//   }
//   update () {
//     this.center.y -= 2
//   }
// }

const game = new Game()
