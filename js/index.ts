interface Circle {
    x: number;
    y: number;
    radius: number;
    color: string;
    shadowColor: string;
    velocityY: number;
}

let circles: Circle[] = [];
let lastTime: number = 0;
const gravity: number = 0.98;
const damping: number = 0.75;
const maxCircles: number = 15;

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

    const fragment: DocumentFragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfBoxes; i++) {
        const colorBox: HTMLDivElement = document.createElement("div");
        colorBox.classList.add("colorBox");
        fragment.appendChild(colorBox);
    }

    bgAnimation.appendChild(fragment);
}

function initializeCanvas(): void {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    canvas.addEventListener('click', (event: MouseEvent) => {
        if (circles.length < maxCircles) {
            const rect: DOMRect = canvas.getBoundingClientRect();
            const x: number = event.clientX - rect.left;
            const y: number = event.clientY - rect.top;
            createCircle(x, y);
        } else {
            alert('Max size of circle is filled!');
        }
    });
}

function initializeControls(): void {
    const clearButton: HTMLButtonElement = document.getElementById('clear-circles') as HTMLButtonElement;
    clearButton.addEventListener('click', () => {
        circles = [];
        updateCircleCount();
    });
}

function createCircle(x: number, y: number): void {
    const sizeInput: HTMLInputElement = document.getElementById('circle-size') as HTMLInputElement;
    const colorInput: HTMLInputElement = document.querySelector('input[name="circle-color"]:checked') as HTMLInputElement;
    const shadowColorInput: HTMLInputElement = document.querySelector('input[name="circle-shadow-color"]:checked') as HTMLInputElement;
    const radius: number = parseInt(sizeInput.value) / 2;
    const color: string = colorInput.value;
    const shadowColor: string = shadowColorInput.value;

    circles.push({ x, y, radius, color, shadowColor, velocityY: 0 });
    updateCircleCount();
}

function updateCircleCount(): void {
    const circleCountElement: HTMLParagraphElement = document.getElementById('circle-count') as HTMLParagraphElement;
    circleCountElement.textContent = `Circles: ${circles.length}/${maxCircles}`;
}

function tick(currentTime: number): void {
    const deltaTime: number = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    updateCircles(deltaTime);
    drawCircles();

    requestAnimationFrame(tick);
}

function updateCircles(deltaTime: number): void {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
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
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
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
