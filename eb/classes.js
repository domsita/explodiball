
class Board {
    constructor(size) {
        this.list = [];
        this.bombs = [];

        while (size > 0) {
            var shape = new Shape(shapeNum);
            shapeNum++;
            this.list.push(shape);
            size--;
        }
    }

    click(x, y) {
        if (moves > 0) {
            moves--;
        } else {
            return;
        }

        var bomb = new Bomb(bombNum, x, y);
        this.bombs.push(bomb);
        bombNum++;
    }

    update() {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].exploded) {
                this.list.splice(i, 1);
            }
        }
        this.list.forEach(function (shape) {
            shape.updateSpot();
            if (shape.x > 525) {
                shape.x = -25;
            } else if (shape.x < -25) {
                shape.x = 525;
            } else if (shape.y > 525) {
                shape.y = -25;
            } else if (shape.y < -25) {
                shape.y = 525;
            }
        });
    }

    freeze() {
        this.list.forEach(function (shape) {
            shape.speed = 0;
            shape.stopped = true;
        });
    }

    add(amount) {
        while (amount > 0) {
            var shape = new Shape(shapeNum);
            shapeNum++;
            this.list.push(shape);
            amount--;
        }
    }

    lookForDamage(bomb) {
        for (var i = 0; i < this.list.length; i++) {
            var s = this.list[i];

            if (bomb.left < s.x && s.x < bomb.right && bomb.top < s.y && s.y < bomb.bot) {
                s.exploded = true;
                score++;
            }
        }
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawShapes();
        this.drawBombs();
    }

    drawShapes() {
        for (var j = 0; j < this.list.length; j++) {
            var thisShape = this.list[j];
            ctx.beginPath();
            ctx.arc(thisShape.x, thisShape.y, thisShape.size, 0, Math.PI*2);
            ctx.fillStyle = thisShape.color;
            ctx.fill();
            ctx.closePath();
            thisShape.updateSpot();
        }
    }


    drawBombs() {
        var bombCount = this.bombs.length;

        if (bombCount != 0) {
            for (var i = 0; i < bombCount; i++) {
                var bomb = this.bombs[i];

                if (bomb.explode) {
                    this.lookForDamage(bomb);
                }

                if (bomb.clear) {
                    this.bombs.splice(i, 1);
                }

                bomb.countdown();
                ctx.beginPath();
                ctx.arc(bomb.x, bomb.y, bomb.size, 0, Math.PI*2);
                ctx.fillStyle = bomb.color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


// CLASSES FOR SHAPES AND BOMBS
// ----------------------------------------------------------------------------------------------------------Circles
class Shape {

    constructor(id) {
        this.id = id;
        this.size = getRan(10, 25);
        this.x = getRan(50, 450);
        this.y = getRan(50, 450);
        this.color = colorPicker();
        this.setSpeed = getRan(1, 3);
        this.speed = this.setSpeed;
        this.direction = getRan(1, 8);
        this.left = this.x - this.size;
        this.right = this.x + this.size;
        this.top = this.y - this.size;
        this.bot = this.y - this.size;
        this.stopped = false;
        this.exploded = false;
    }

    toggleStop() {
        if (this.stopped) {
            this.speed = this.setSpeed;
            this.stopped = false;
        } else {
            this.speed = 0;
            this.stopped = true;
        }
    }

    updateSpot() {
        switch (this.direction) {
            case 1:         this.x += this.speed;           this.y += this.speed;           break;
            case 2:         this.x += this.speed;           this.y -= this.speed;            break;
            case 3:         this.x -= this.speed;            this.y += this.speed;           break;
            case 4:         this.x -= this.speed;            this.y -=  this.speed;           break;
            case 5:         this.x += this.speed;                                                      break;
            case 6:         this.x -= this.speed;                                                       break;
            case 7:         this.y += this.speed;                                                      break;
            case 8:         this.y -= this.speed;                                                       break;
            default:        console.log("Error updating positions on "+this.id);
        }
    }

}


// ----------------------------------------------------------------------------------------------------------Bombs
class Bomb {

    constructor(id, x, y) {
        this.id = id;
        this.size = 2;
        this.color = "#000000";
        this.x = x;
        this.y = y;
        this.explode = false;
        this.left = this.x - 100;
        this.right = this.x + 100;
        this.top = this.y - 100;
        this.bot = this.y + 100;
        this.clear = false;
        this.turns = 50;
    }

    countdown() {
        this.turns--;
        if (this.turns >= 0) {
            this.turns--;
        } else {
            this.clear = true;
        }
        if (this.turns >= 0) {
            this.size++;
            return;
        } else {
            this.explode = true;
            this.color = "#FF0000";
            this.size = 100;
            this.turns = 40;
            return;
        }
    }

}
