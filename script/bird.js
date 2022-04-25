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