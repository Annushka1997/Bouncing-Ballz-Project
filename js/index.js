var circles = [];
var lastTime = 0;
var gravity = 0.98;
var damping = 0.75;
var maxCircles = 15;
document.addEventListener('DOMContentLoaded', function () {
    initializeBackgroundAnimation("#bgAnimation", 400);
    initializeCanvas();
    initializeControls();
    updateCircleCount();
    requestAnimationFrame(tick);
});
function initializeBackgroundAnimation(selector, numberOfBoxes) {
    var bgAnimation = document.querySelector(selector);
    if (!bgAnimation) {
        console.error("Element with selector \"".concat(selector, "\" not found."));
        return;
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < numberOfBoxes; i++) {
        var colorBox = document.createElement("div");
        colorBox.classList.add("colorBox");
        fragment.appendChild(colorBox);
    }
    bgAnimation.appendChild(fragment);
}
function initializeCanvas() {
    var canvas = document.getElementById('canvas');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvas.addEventListener('click', function (event) {
        if (circles.length < maxCircles) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            createCircle(x, y);
        }
        else {
            alert('Max size of circle is filled!');
        }
    });
}
function initializeControls() {
    var clearButton = document.getElementById('clear-circles');
    clearButton.addEventListener('click', function () {
        circles = [];
        updateCircleCount();
    });
}
function createCircle(x, y) {
    var sizeInput = document.getElementById('circle-size');
    var colorInput = document.querySelector('input[name="circle-color"]:checked');
    var shadowColorInput = document.querySelector('input[name="circle-shadow-color"]:checked');
    var radius = parseInt(sizeInput.value) / 2;
    var color = colorInput.value;
    var shadowColor = shadowColorInput.value;
    circles.push({ x: x, y: y, radius: radius, color: color, shadowColor: shadowColor, velocityY: 0 });
    updateCircleCount();
}
function updateCircleCount() {
    var circleCountElement = document.getElementById('circle-count');
    circleCountElement.textContent = "Circles: ".concat(circles.length, "/").concat(maxCircles);
}
function tick(currentTime) {
    var deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    updateCircles(deltaTime);
    drawCircles();
    requestAnimationFrame(tick);
}
function updateCircles(deltaTime) {
    var canvas = document.getElementById('canvas');
    circles.forEach(function (circle) {
        circle.velocityY += gravity;
        circle.y += circle.velocityY * deltaTime;
        if (circle.y + circle.radius > canvas.height) {
            circle.y = canvas.height - circle.radius;
            circle.velocityY *= -damping;
        }
    });
}
function drawCircles() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(function (circle) {
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
