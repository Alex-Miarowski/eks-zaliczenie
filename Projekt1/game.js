let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height / 2 + 200
let playerRadius = 30
let playerSpeed = 30

let brickRowCount = 7
let brickColumnCount = 5
let brickWidth = 75
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 50

let isGameOn = true
let gameOffCount = 0
let frameId
let intervalRockSpawn
let intervalSRockSpawn
let isWin

let scoreboardDiv = document.getElementById("scoreboard")
let startBtn = document.getElementById("startBtn")
let finalScoreP = document.getElementById("finalScore")

let player
let bullets
let rocks
let bricks

class Player {
    constructor(x, y, radius, color, speed){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.speed = speed
        this.score = 0
        this.destroyedBricksCounter = 0
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    move(direction){
        if(direction == 'r' && this.x < canvas.width - 30){
            this.x += this.speed
        }
        else if(direction == 'l' && this.x > 0){
            this.x -= this.speed
        }
    }
}

class Bullet {
    constructor(x, y, radius, color, speed){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.speed = speed
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    move(){
        this.draw()
        this.y -= this.speed
    }
}

class Brick{
    constructor(x, y, width, height, color, status){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
        this.status = status
    }

    draw(){
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

}

class Rock {
    constructor(x, y, radius, color, speed, type){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.speed = speed
        this.type = type
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    move(){
        this.draw()
        this.y += this.speed
    }
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                bricks[c][r].draw()
            }
        }
    }
}

function spawnRock() {
    intervalRockSpawn = setInterval(() => {
        let rockX = Math.floor(Math.random() * (680)) + 20;
        let rockRadius = Math.random() * 15 + 10
        rocks.push(new Rock(rockX, 0, rockRadius, 'green', 5, 1))
    }, 800)

    intervalSRockSpawn = setInterval(() => {
        let sRockX = Math.floor(Math.random() * (600)) + 40;
        let sRockRadius = Math.random() * 10 + 30
        rocks.push(new Rock(sRockX, 0, sRockRadius, 'red', 4, 2))
    }, 1200)
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + player.score, 8, 20);
}

document.addEventListener('keydown', keyDownHandler)

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        player.move('r')
    }
    else if(e.keyCode == 37) {
        player.move('l')
    }
    else if(e.keyCode == 32) {
        bullets.push(new Bullet(player.x, y, 5, 'yellow', 10))
    }
}

function animate(){
    frameId = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0,0,35,0.2)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawBricks()
    player.draw()
    collisionWithBullet()
    collisionWithRock()
    drawScore()
    if (!isGameOn){
        gameOff()
    }
}

function collisionWithBullet() {
    bullets.forEach((bullet, bulletIndex) => {
        bullet.move()

        rocks.forEach((rock, rockIndex) => {
            let distance = Math.hypot(bullet.x - rock.x, bullet.y - rock.y)
            if (distance - bullet.radius - rock.radius < 1){
                if (rock.type == 1){
                    setTimeout(() => {
                        rocks.splice(rockIndex, 1)
                        bullets.splice(bulletIndex, 1)
                    }, 0)
                    player.score += 10
                }
                else if (rock.type == 2){
                    setTimeout(() => {
                        bullets.splice(bulletIndex, 1)
                    }, 0)
                }
            }
        })
        for(let c=0; c<brickColumnCount; c++) {
            for(let r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    if(bullet.x + bullet.radius >= bricks[c][r].x && bullet.x - bullet.radius <= bricks[c][r].x + bricks[c][r].width && bullet.y - bullet.radius <= bricks[c][r].y + bricks[c][r].height){
                        setTimeout(() => {
                            bricks[c][r].status = 0
                            bullets.splice(bulletIndex, 1)
                        }, 0)
                        player.score += 100
                        player.destroyedBricksCounter ++
                        if (player.destroyedBricksCounter == brickColumnCount * brickRowCount){
                            isWin = true
                            gameOver()
                        }
                    }
                }
            }
        }
        setTimeout(() => {
            if(bullet.y <= 0){
                bullets.splice(bulletIndex, 1)
            }
        }, 0)
    })
}

function collisionWithRock() {
    rocks.forEach((rock, rockIndex) =>{
        rock.move()
        distance = Math.hypot(player.x - rock.x, player.y - rock.y)
        if (distance - player.radius - rock.radius < 1){
            isWin = false
            gameOver()
        }
        setTimeout(() => {
            if(rock.y >= 500){
                rocks.splice(rockIndex, 1)
            }
        }, 0)
        rocks.forEach((rock2, rock2Index) =>{
            if (rockIndex != rock2Index){
                distance = Math.hypot(rock2.x - rock.x, rock2.y - rock.y)
                if (distance - rock2.radius - rock.radius < 1){
                    setTimeout(() => {
                        rocks.splice(rockIndex, 1)
                    }, 0)
                }
            }
        })
    })
}

function gameOver() {
    clearInterval(intervalRockSpawn)
    clearInterval(intervalSRockSpawn)
    isGameOn = false
}

function gameOff() {
    if (gameOffCount < 2){
        gameOffCount++
    }
    else {
        cancelAnimationFrame(frameId)
        scoreboardDiv.style.display = ''
        if(isWin){
            finalScoreP.innerHTML = "Good job, You WON! <br> Your score: " + player.score
        }
        else {
            finalScoreP.innerHTML = "Oh no, You LOST!"
        }
    }   
}

startBtn.addEventListener("click", () => {
    restart()
    animate()
    spawnRock()
    scoreboardDiv.style.display = 'none'
})

function restart() {
    gameOffCount = 0
    isGameOn = true
    player = new Player(x, y, playerRadius, 'blue', playerSpeed)
    bullets = []
    rocks = []
    bricks = []
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft
            let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop
            let brick = new Brick(brickX, brickY, brickWidth, brickHeight, "aqua", 1)
            bricks[c][r] = brick
        }
    }
}
