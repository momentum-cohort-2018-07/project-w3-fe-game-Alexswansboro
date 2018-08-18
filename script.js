const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')
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
class Game {
    constructor() {
        this.player = new Player(this)
        this.aliens = [new Alien(), new Alien(), new Alien(), new Alien(), new Alien(), new Alien(), new Alien(), new Alien()] 
        this.bullets = []
        this.ticks()
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
        if(this.gameOver === true){
            console.log('checking to see if game is over')
            this.context.textAlign = 'center'
            this.context.font = '48px Helvetica'
            this.context.fillStyle = 'black'
            this.context.fillText('game over', this.screenSize.x / 2, this.screenSize.y / 2)
        }
    }
    ticks() {
        this.update()
        this.draw()
        requestAnimationFrame(() => this.ticks())
    }
    alienHitsBottom(){
        let alienAtBottom = this.aliens.alienStart.y
        console.log('alienhitsbottom')
        if (alienAtBottom >= 100){
            return true
        }
    }
    checkGameOver(){
        if(this.alienHitsBottom() === true){
            this.gameOver = true
            console.log("checkGameOver")
        }
    }
    update() {
        this.player.update()
        this.aliens.forEach(function(alien){
            console.log('updating alien in game class')
            alien.update()
        })
        this.bullets.forEach(function(bullet){
            bullet.update()
        })
    }

}
context.clearRect(0, 0, 500, 500)

class Player {
    constructor(game) {
        this.center = {
            x: screenSize.x / 2 - 10,
            y: 450
        }
        this.playerSize = {
            x: 20,
            y: 20
        }
        this.keyboarder = new Keyboarder()
        this.game = game

    }
    draw() {
        context.fillStyle = colors.player
        context.fillRect(this.center.x, this.center.y, this.playerSize.x, this.playerSize.y)
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
    }   
}
class Alien {
    constructor() {
        this.alienStart = {
            x: Math.floor(Math.random()*500),
            y: 20
        }
        this.alien = {
            x: 15,
            y: 15
        }
    }
    draw() {
        context.fillStyle = colors.aliens
        context.fillRect(this.alienStart.x, this.alienStart.y, this.alien.x, this.alien.y)
    }
    update() {
        this.alienStart.y += 1
        if(this.alienStart.y >= 200){
            console.log("updating in alien class")
            this.alienHitsBottom()
        }
    }
}
class Bullet {
    constructor(playerStartingX) {
        this.keyboarder = new Keyboarder()
        this.bulletStart = {
            x: playerStartingX,
            y: 445
        }
        this.bulletSize = {
            x: 5,
            y: 5
        }
        this.game = game
    }
    draw() {
        context.fillStyle = colors.bullets
        context.fillRect(this.bulletStart.x, this.bulletStart.y, this.bulletSize.x, this.bulletSize.y )
    }
    update() {   
        this.bulletStart.y -= 2
    }
}



const game = new Game()