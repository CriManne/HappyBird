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