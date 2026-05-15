const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');

// Game objects
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 8;

const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 6
};

const computer = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 5
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    radius: ballSize,
    speed: 5
};

let playerScore = 0;
let computerScore = 0;
let gameRunning = false;

// Input handling
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (e.key === ' ') {
        e.preventDefault();
        gameRunning = !gameRunning;
    }
    
    if (e.key.toLowerCase() === 'r') {
        resetGame();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    player.y = Math.max(0, Math.min(mouseY - paddleHeight / 2, canvas.height - paddleHeight));
});

// Player movement with keyboard
function updatePlayerMovement() {
    if (keys['ArrowUp'] || keys['w']) {
        player.y = Math.max(0, player.y - player.speed);
    }
    if (keys['ArrowDown'] || keys['s']) {
        player.y = Math.min(canvas.height - player.height, player.y + player.speed);
    }
}

// Computer AI
function updateComputerMovement() {
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;
    
    if (ballCenter < computerCenter - 35) {
        computer.y = Math.max(0, computer.y - computer.speed);
    } else if (ballCenter > computerCenter + 35) {
        computer.y = Math.min(canvas.height - computer.height, computer.y + computer.speed);
    }
}

// Ball physics
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Wall collision (top and bottom)
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
    }
    
    // Paddle collision - Player
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx = -ball.dx;
        ball.x = player.x + player.width + ball.radius;
        
        // Add spin based on paddle position
        const hitPos = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
        ball.dy = hitPos * ball.speed;
    }
    
    // Paddle collision - Computer
    if (
        ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx = -ball.dx;
        ball.x = computer.x - ball.radius;
        
        // Add spin based on paddle position
        const hitPos = (ball.y - (computer.y + computer.height / 2)) / (computer.height / 2);
        ball.dy = hitPos * ball.speed;
    }
    
    // Score points
    if (ball.x - ball.radius < 0) {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        resetBall();
    }
    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        resetBall();
    }
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() - 0.5) * ball.speed * 2;
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    resetBall();
    player.y = canvas.height / 2 - paddleHeight / 2;
    computer.y = canvas.height / 2 - paddleHeight / 2;
    gameRunning = false;
}

// Drawing functions
function drawPaddle(paddle) {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 10;
}

function drawBall() {
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = '#ffff00';
    ctx.shadowBlur = 15;
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw game elements
    drawCenterLine();
    drawPaddle(player);
    drawPaddle(computer);
    drawBall();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
}

// Game loop
function gameLoop() {
    if (gameRunning) {
        updatePlayerMovement();
        updateComputerMovement();
        updateBall();
    }
    
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
resetBall();
gameLoop();