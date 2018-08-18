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
        this.bullets = [new Bullet(), new Bullet()]
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
        this.update()
        this.draw()
        requestAnimationFrame(() => this.ticks())
    }
    update() {
        this.player.update()
        this.aliens.forEach(function(alien){
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
            console.log('bullet space bar')
            this.game.bullets.push(new Bullet()) 
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
    }
    alienStart(){

    }
}
class Bullet {
    constructor() {
        this.keyboarder = new Keyboarder()
        this.bulletStart = {
            x: screenSize.x / 2 - 2.5,
            y: 445
        }
        this.bulletSize = {
            x: 5,
            y: 5
        }
    }
    draw() {
        context.fillStyle = colors.bullets
        context.fillRect(this.bulletStart.x, this.bulletStart.y, this.bulletSize.x, this.bulletSize.y)
    }

    update() {   
        this.bulletStart.y -= 2
    }
}




    const alien = new Alien()
    const game = new Game()