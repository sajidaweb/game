const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let blocks = [];
let gameSpeed = 1;
let gameOverFlag = false;

class Block {
    constructor() {
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 50);
        this.width = 50;
        this.height = 50;
        this.speed = Math.random() * 3 + 1;
        this.color = 'blue'; // Changed color to blue for blocks
    }

    update() {
        this.x -= gameSpeed;
        this.draw();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function spawnBlocks() {
    if (Math.random() > 0.97) {
        blocks.push(new Block()); // Fixed typo in push method
    }
}

function animate() {
    if (!gameOverFlag) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        spawnBlocks();
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].update();
        }
        drawScore();

        if (score >= 100) {
            gameOverFlag = true;
            gameWon();
            return;
        }

        requestAnimationFrame(animate);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function gameWon() {
    ctx.fillStyle = 'green';
    ctx.font = '30px Arial';
    ctx.fillText('Hurray!!!!! You Won', canvas.width / 2 - 120, canvas.height / 2 - 20);
    ctx.fillText('Final Score: ' + score, canvas.width / 2 - 80, canvas.height / 2 + 20);
}

animate();

canvas.addEventListener('click', (event) => {
    if (!gameOverFlag) {
        const mouseX = event.clientX - canvas.offsetLeft;
        const mouseY = event.clientY - canvas.offsetTop;

        for (let i = 0; i < blocks.length; i++) {
            if (mouseX >= blocks[i].x && mouseX <= blocks[i].x + blocks[i].width &&
                mouseY >= blocks[i].y && mouseY <= blocks[i].y + blocks[i].height) {
                blocks.splice(i, 1);
                i--;
                score++;
            }
        }
    }
});

setInterval(() => {
    gameSpeed += 0.1; // Adjust the rate of increase as needed
}, 500);
