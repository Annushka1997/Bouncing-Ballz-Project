interface Circle {
    x: number;
    y: number;
    radius: number;
    color: string;
    shadowColor: string; 
    velocityY: number;
}

let circles: Circle[] = [];
let lastTime = 0;
const gravity = 0.98; 
const damping = 0.75; 
const maxCircles = 15;

document.addEventListener('DOMContentLoaded', () => {
    initializeBackgroundAnimation("#bgAnimation", 400);
    initializeCanvas();
    initializeControls();
    updateCircleCount();
    requestAnimationFrame(tick);
});

function initializeBackgroundAnimation(selector: string, numberOfBoxes: number): void {
    const bgAnimation = document.querySelector<HTMLElement>(selector);
    if (!bgAnimation) {
        console.error(`Element with selector "${selector}" not found.`);
        return;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfBoxes; i++) {
        const colorBox = document.createElement("div");
        colorBox.classList.add("colorBox");
        fragment.appendChild(colorBox);
    }

    bgAnimation.appendChild(fragment);
}

function initializeCanvas(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    canvas.addEventListener('click', (event) => {
        if (circles.length < maxCircles) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            createCircle(x, y);
        } else {
            alert('Max size of circle is filled!');
        }
    });
}

function initializeControls(): void {
    const clearButton = document.getElementById('clear-circles') as HTMLButtonElement;
    clearButton.addEventListener('click', () => {
        circles = [];
        updateCircleCount();
    });
}

function createCircle(x: number, y: number): void {
    const sizeInput = document.getElementById('circle-size') as HTMLInputElement;
    const colorInput = document.querySelector('input[name="circle-color"]:checked') as HTMLInputElement;
    const shadowColorInput = document.querySelector('input[name="circle-shadow-color"]:checked') as HTMLInputElement; 
    const radius = parseInt(sizeInput.value) / 2;
    const color = colorInput.value;
    const shadowColor = shadowColorInput.value; 

    circles.push({ x, y, radius, color, shadowColor, velocityY: 0 }); 
    updateCircleCount();
}

function updateCircleCount(): void {
    const circleCountElement = document.getElementById('circle-count') as HTMLParagraphElement;
    circleCountElement.textContent = `Circles: ${circles.length}/${maxCircles}`;
}

function tick(currentTime: number): void {
    const deltaTime = (currentTime - lastTime) / 1000; 
    lastTime = currentTime;

    updateCircles(deltaTime);
    drawCircles();

    requestAnimationFrame(tick);
}

function updateCircles(deltaTime: number): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    circles.forEach(circle => {
        circle.velocityY += gravity;
        circle.y += circle.velocityY * deltaTime;

        if (circle.y + circle.radius > canvas.height) {
            circle.y = canvas.height - circle.radius;
            circle.velocityY *= -damping;
        }
    });
}

function drawCircles(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        circles.forEach(circle => {
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            context.fillStyle = circle.color;
            context.shadowColor = circle.shadowColor; 
            context.shadowBlur = 20; 
            context.fill();
            context.closePath();
        });
    }
}
