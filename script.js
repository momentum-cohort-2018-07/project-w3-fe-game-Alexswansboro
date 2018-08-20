const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')
context.clearRect(0, 0, 500, 500)
const screenSize = {
    x: canvas.width,
    y: canvas.height
}
const colors = {
    player: '#972D07',
    bullets: '#ED1C24',
    aliens: getRandomColor()
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function colliding (b1, b2) {
    return !(
      b1 === b2 ||
          b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
          b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
          b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
          b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
    )
  }
class Game {
    constructor() {
        this.gameOver = false
        this.player = new Player(this)
        this.aliens = [new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this)] 
        this.bullets = []
        this.ticks()
        // this.centerY = this.aliens.alien.center.y
        
    }
    draw() {
        context.clearRect(0, 0, 500, 500)
        this.bullets.forEach(function(bullet){
            bullet.draw()
        })
        this.aliens.forEach(function(alien){
            alien.draw()
        })
        this.player.draw()
    }
    ticks() {
        if(this.gameOver){
            console.log('checking to see if game is over')
            context.textAlign = 'center'
            context.font = '48px Helvetica'
            context.fillStyle = 'black'
            context.fillText('game over', screenSize.x / 2, screenSize.y / 2)
        }else{
            this.update()
            this.draw()
            requestAnimationFrame(() => this.ticks())
        }
    }
    update() {
        this.player.update()
        this.aliens.forEach((alien) => {
            alien.update()   
        })
        this.bullets.forEach(function(bullet){
            bullet.update()
        })
    }
    stop(){
        this.context.textAlign = 'center'
        this.context.font = '48px Helvetica'
        this.context.fillStyle = 'black'
        this.context.fillText('game over', this.screenSize.x / 2, this.screenSize.y / 2)
    }
}

class Player {
    constructor(game) {
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
    draw() {
        context.fillStyle = colors.player
        context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
    }
    update() {
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
            if (colliding(this, alien)){
                this.game.gameOver = true
            }
        })
    }   
}
class Alien {
    constructor(game) {
        this.center = {
            x: Math.floor(Math.random()*500),
            y: 20
        }
        this.size = {
            x: 20,
            y: 20
        }
        this.game = game
        // context.fillStyle = getRandomColor()
    }
    draw() {
        context.fillStyle = getRandomColor()
        context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
    }
    update() {
        this.center.y += 1
        if(this.center.y >= 500){
            this.game.gameOver = true     
        }
        this.game.bullets.forEach((bullet) => {
            bullet.forEach((game.aliens) => {
                if (colliding(alien, bullet)){
                    this.game.bullets.splice(i, 1)
                } if (aliens.length === 0){
                    this.game.gameOver = true
                }
            })
        })
    } 
}
class Bullet {
    constructor(playerStartingX) {
        this.center = {
            x: playerStartingX,
            y: 445
        }
        this.size = {
            x: 5,
            y: 5
        }
        this.game = game
    }
    draw() {
        context.fillStyle = colors.bullets
        context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y )
    }
    update() {   
        this.center.y -= 2
    }
}

const game = new Game()