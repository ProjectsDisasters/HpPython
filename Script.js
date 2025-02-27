document.addEventListener("DOMContentLoaded", function() {
    console.log("Website geladen!");

    // Extra animatie effect voor de titel
    let title = document.querySelector("h1");
    title.style.opacity = "0";
    setTimeout(() => {
        title.style.transition = "opacity 2s ease-in";
        title.style.opacity = "1";
    }, 500);

    // Snake game variables
    const canvas = document.getElementById("snake-game");
    const ctx = canvas.getContext("2d");

    const grid = 20; // Increased grid size
    let snake = [{ x: 160, y: 160 }];
    let food = { x: 0, y: 0 };
    let dx = grid;
    let dy = 0;
    let gameInterval;
    let gameRunning = false;

    // Start the Snake game
    function startGame() {
        canvas.width = 300;  // Increased canvas size
        canvas.height = 300; // Increased canvas size
        placeFood();
        gameRunning = true;
        document.getElementById("play-button").style.display = "none";  // Hide the play button
        document.getElementById("play-again-button").style.display = "none";  // Hide play again button
        gameInterval = setInterval(updateGame, 200); // Slow down snake (200ms interval)
    }

    // Update the game every interval
    function updateGame() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Game over condition
        if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
            clearInterval(gameInterval);
            gameRunning = false;
            document.getElementById("play-again-button").style.display = "inline-block";  // Show play again button
            alert("Game Over!");
            return;
        }

        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            placeFood();
        } else {
            snake.pop();
        }

        drawGame();
    }

    // Draw the Snake and food
    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "lime";
        snake.forEach((segment) => {
            ctx.fillRect(segment.x, segment.y, grid, grid);
        });

        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, grid, grid);
    }

    // Place food randomly
    function placeFood() {
        food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
        food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
    }

    // Change snake's direction based on keyboard input
    function changeDirection(event) {
        if (!gameRunning) return; // Prevent changes when game is over
        switch (event.key) {
            case "ArrowUp":
                if (dy === 0) { dx = 0; dy = -grid; }
                break;
            case "ArrowDown":
                if (dy === 0) { dx = 0; dy = grid; }
                break;
            case "ArrowLeft":
                if (dx === 0) { dx = -grid; dy = 0; }
                break;
            case "ArrowRight":
                if (dx === 0) { dx = grid; dy = 0; }
                break;
        }
    }

    // Add event listener to start game on Play button click
    document.getElementById("play-button").addEventListener("click", startGame);

    // Add event listener to restart game on Play Again button click
    document.getElementById("play-again-button").addEventListener("click", function() {
        snake = [{ x: 160, y: 160 }];
        dx = grid;
        dy = 0;
        gameRunning = false;
        document.getElementById("play-button").style.display = "none";
        startGame();
    });

    // Listen for arrow key presses to control the snake
    window.addEventListener("keydown", changeDirection);
});
