
const canvas = document.getElementById('screen')
const screen = canvas.getContext('2d')
const screenSize = {x: canvas.width, y: canvas.height} 

class FieldOfPlay {
    constructor(screenSize, screen, walls){
    }
    
}
function updateGame(something) {
    requestAnimationFrame(updateGame)
    
}

updateGame()
createPlayer()

function createPlayer(){
    let createPlayer = screen
    console.log("hi")
    createPlayer.fillStyle = "#000000"
    createPlayer.fillRect(screenSize.x/2-15, 350, 15, 15 )
}
window.addEventListener("keydown", draw, false);
function draw(e){
    switch(e.keyCode) {
        case 37:
            // left key pressed
            break;
        case 38:
            // up key pressed
            break;
        case 39:
            // right key pressed
            break;
        case 40:
            // down key pressed
            break;  
    }
    screen.clearRect(0, 0, screenSize.x, screenSize.y) 
}
draw()
