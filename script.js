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
class Game {
    constructor() {
        this.gameOver = false
        this.player = new Player(this)
        this.aliens = [new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this)] 
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
            if(alien.alienStart.y + 20 === this.player.center.y 
                || alien.alienStart.y + 20 === this.player.center.y + 20 
                || alien.alienStart.x + 20 === this.player.center.x 
                || alien.alienStart.x === this.player.center.x + 20){
                    this.gameOver = true
                }
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
    constructor(game) {
        this.alienStart = {
            x: Math.floor(Math.random()*500),
            y: 20
        }
        this.alien = {
            x: 20,
            y: 20
        }
        this.game = game
        // context.fillStyle = getRandomColor()
    }
    draw() {
        // context.fillStyle = getRandomColor()
        context.fillRect(this.alienStart.x, this.alienStart.y, this.alien.x, this.alien.y)
    }
    update() {
        this.alienStart.y += 1
        if(this.alienStart.y >= 500){
            this.game.gameOver = true     
       }
    } 
}
class Bullet {
    constructor(playerStartingX) {
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