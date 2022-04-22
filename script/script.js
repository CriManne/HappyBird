var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d", { alpha: false });

const fps = 60;

var bird = null;
var obstacles = [];

var lost = false;
var win = false;

var lastX = canvas.width;
var game_difficulty = 250;

var score = 0;

const GAME_VELOCITY = 5;


window.onload = function() {

    gameStart();

    window.addEventListener("keydown", function(evt) {
        if (evt.key == " ") {
            if (!lost && !win) {
                bird.jump();
            }
        } else if (evt.key == 'r' || evt.key == 'R') {
            bird = new Bird(50, 50, 50, 51);
            obstacles = [];
            lastX = canvas.width - 10;
            generateObstacles();
            score = 0;
            lost = false;
            win = false;
        }
    });
}

function gameStart() {

    bird = new Bird(50, 50, 50, 51);

    generateObstacles();

    setInterval(gameLoop, 1000 / fps);

}

function gameLoop() {

    show();

    if (!lost && !win) {
        update();
    }

}

function show() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    //DRAW CANVAS
    drawRect(0, 0, canvas.width, canvas.height, "#6db5d1");

    //DRAW BIRD
    drawing = new Image(50, 50);
    drawing.src = "assets/sprite.png";
    drawing.addEventListener('load', function() {
        canvasContext.drawImage(drawing, bird.pos.x, bird.pos.y);
    });

    //DRAW OBSTACLES
    for (var i = 0; i < obstacles.length; i++) {
        var element = obstacles[i];
        if (i == obstacles.length - 1) {
            drawRect(element.pos.x, element.pos.y, element.width, element.height, "WHITE");
        } else {
            drawRect(element.pos.x, element.pos.y, element.width, element.height, "GREEN");
        }
    }

    //DRAW ISTRUCTION        
    canvasContext.textAlign = "right";
    drawText('Arial', '15px', 'black', canvas.width - 20, 20, "Press space to jump.");

    //DRAW RESTART            
    canvasContext.textAlign = "right";
    drawText('Arial', '15px', 'black', canvas.width - 20, 50, "Press 'R' to restart the game.");


    if (lost) {
        text = "YOU LOST, SCORE: " + score;
        canvasContext.textAlign = "center";
        drawText('Arial', '20px', 'RED', canvas.width / 2, canvas.height / 2, text);
        return;
    }

    if (win) {
        text = "YOU WON, SCORE: " + score;
        canvasContext.textAlign = "center";
        drawText('Arial', '20px', 'GREEN', canvas.width / 2, canvas.height / 2, text);
        return;
    }

    //DRAW SCORE    
    canvasContext.textAlign = "left";
    drawText('Arial', '25px', 'black', 20, canvas.height - 20, "Score: " + score);

}

function update() {

    bird.move();

    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
    }

}

function generateObstacles() {
    for (var i = 0; i < Math.round(getRandomArbitrary(15, 30)); i++) {
        obstacles.push(new Obstacle);
    }
    obstacles.push(new Obstacle(height = canvas.height, 1));
    lastX = obstacles[obstacles.length - 1].pos.x + game_difficulty;
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - 1 - min) + min);
}

function drawRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawText(font, size, color, posX, posY, text) {
    canvasContext.fillStyle = color;
    canvasContext.font = size + " " + font;
    canvasContext.fillText(text, posX, posY);
}

class Obstacle {

    constructor(height = getRandomArbitrary(200, 400), posY = -1) {
        this.width = getRandomArbitrary(65, 75);
        this.height = height;
        var random = getRandomArbitrary(0, 3);
        if (posY == -1) {
            switch (random) {
                case 0:
                    {
                        this.pos = { x: lastX + this.width, y: 0 };
                        break;
                    }
                case 1:
                    {
                        this.pos = { x: lastX + this.width, y: canvas.height - this.height };
                        break;
                    }
                case 2:
                    {
                        this.pos = { x: lastX + this.width, y: getRandomArbitrary(100, 500) };
                        break;
                    }
            }
        } else {
            this.pos = { x: lastX + this.width, y: 0 };
        }
        lastX += this.width + game_difficulty;
    }

    update() {
        if (this.pos.x < 0) {
            obstacles.splice(obstacles.indexOf(this), 1);
            score++;
            if (obstacles.length < 1) {
                win = true;
            }
            return;
        }
        this.pos.x -= GAME_VELOCITY;
    }

}

class Bird {
    constructor(posX, posY, width, height) {
        this.pos = { x: posX, y: posY };
        this.speedX = 0;
        this.width = width;
        this.height = height;
    }

    hitWall() {
        if (obstacles.length < 2) {
            return false;
        }
        var obs = obstacles[0];
        var posBirdX = this.pos.x;
        var posBirdY = this.pos.y;
        var posObsX = obs.pos.x;
        var posObsY = obs.pos.y;

        if (posBirdX > posObsX - this.width && posBirdX < posObsX + obs.width && posBirdY > posObsY - this.height && posBirdY < posObsY + obs.height) {
            return true;
        }

        return false;
    }

    move() {
        if (this.pos.y > canvas.height - this.height || this.pos.y < -this.height || this.hitWall()) {
            lost = true;
        } else {
            this.speedX += 0.2;
            if (this.speedX < 0) {
                this.pos.y += this.speedX + 0.05;
            } else {
                this.pos.y += this.speedX;
            }
        }
    }
    jump() {
        this.speedX = -6;
    }
}