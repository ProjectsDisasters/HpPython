document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let snake;
    let apple;

    // Initialize snake and apple
    function init() {
        snake = new Snake();
        apple = new Apple();
    }

    // Game loop
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.update();
        snake.draw();
        apple.draw();

        if (snake.eat(apple)) {
            apple = new Apple();
        }

        if (snake.checkCollision()) {
            alert("Game Over");
            init(); // Restart game
        }
    }

    // Snake Class
    function Snake() {
        this.snakeArray = [{ x: 5, y: 5 }];
        this.direction = "right";

        this.update = function () {
            const head = { ...this.snakeArray[0] };

            switch (this.direction) {
                case "up":
                    head.y -= 1;
                    break;
                case "down":
                    head.y += 1;
                    break;
                case "left":
                    head.x -= 1;
                    break;
                case "right":
                    head.x += 1;
                    break;
            }

            this.snakeArray.unshift(head);
            this.snakeArray.pop();
        };

        this.draw = function () {
            ctx.fillStyle = "green";
            for (let i = 0; i < this.snakeArray.length; i++) {
                ctx.fillRect(this.snakeArray[i].x * scale, this.snakeArray[i].y * scale, scale, scale);
            }
        };

        this.changeDirection = function (event) {
            switch (event.key) {
                case "w":
                    if (this.direction !== "down") this.direction = "up";
                    break;
                case "s":
                    if (this.direction !== "up") this.direction = "down";
                    break;
                case "a":
                    if (this.direction !== "right") this.direction = "left";
                    break;
                case "d":
                    if (this.direction !== "left") this.direction = "right";
                    break;
            }
        };

        this.eat = function (apple) {
            if (this.snakeArray[0].x === apple.x && this.snakeArray[0].y === apple.y) {
                this.snakeArray.push({}); // Grow snake
                return true;
            }
            return false;
        };

        this.checkCollision = function () {
            const head = this.snakeArray[0];
            // Check wall collision
            if (head.x < 0 || head.y < 0 || head.x >= columns || head.y >= rows) {
                return true;
            }
            // Check body collision
            for (let i = 1; i < this.snakeArray.length; i++) {
                if (this.snakeArray[i].x === head.x && this.snakeArray[i].y === head.y) {
                    return true;
                }
            }
            return false;
        };
    }

    // Apple Class
    function Apple() {
        this.x = Math.floor(Math.random() * columns);
        this.y = Math.floor(Math.random() * rows);

        this.draw = function () {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
        };
    }

    document.addEventListener("keydown", (event) => snake.changeDirection(event));

    // Start the game when "Play" button is pressed
    document.getElementById("play-button").addEventListener("click", () => {
        init();
        setInterval(loop, 100); // Update game every 100 ms
    });
});
