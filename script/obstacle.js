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