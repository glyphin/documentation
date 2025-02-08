// Variables
var numCircles = 12;
var minHue = 10;
var maxHue = 40;
var spd = 0.1;
var startRadius = 100;
var endRadius = 500;
var overlayOpacity = 0.5; // Set overlay opacity manually (0.0 to 1.0)

// Setup the canvas
document.body.style.background = "black";
document.body.innerHTML = `
    <canvas id='canvas' style='position:absolute;left:0;top:0;z-index:-2'></canvas>
    <canvas id='overlay' style='position:absolute;left:0;top:0;z-index:-1'></canvas>
` + document.body.innerHTML;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const overlayCtx = overlay.getContext("2d");

// Used for animation
var lastTime = 0;
var circles = [];

// Functions
function createCircles() {
    circles = [];
    for (var i = 0; i < numCircles; i++) {
        var colRand = Math.random();
        circles.push({
            x: Math.round(Math.random() * document.documentElement.scrollWidth),
            y: Math.round(Math.random() * document.documentElement.scrollHeight),
            r: i / numCircles,
            colorRand: colRand,
            color: minHue + Math.round(colRand * (maxHue - minHue))
        });
    }
}

function recolor() {
    const tempMaxHue = minHue > maxHue ? maxHue + 360 : maxHue;
    for (let i = 0; i < circles.length; i++) {
        circles[i].color = minHue + Math.round(circles[i].colorRand * (tempMaxHue - minHue));
    }
}

function animate(timeStamp) {
    // Resize the canvases
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
    overlay.width = canvas.width;
    overlay.height = canvas.height;

    // Calculate the elapsed time since the last frame
    let elapsedTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // If the elapsed time is too large, reset it
    if (elapsedTime > 500) elapsedTime = 1;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
        // Scale the animation value based on elapsed time
        circles[i].r += spd * (elapsedTime / 1000);

        if (circles[i].r >= 1) {
            circles[i].r = circles[i].r % 1;
            circles[i].x = Math.round(Math.random() * document.documentElement.scrollWidth);
            circles[i].y = Math.round(Math.random() * document.documentElement.scrollHeight);
            circles[i].colorRand = Math.random();
            circles[i].color = minHue + Math.round(circles[i].colorRand * (maxHue - minHue));
        }

        // Calculate the circle's radius
        const radius = startRadius + Math.sin(circles[i].r * Math.PI) * (endRadius - startRadius);

        // Set the fill style to a radial gradient with reduced saturation
        ctx.fillStyle = ctx.createRadialGradient(circles[i].x, circles[i].y, 0, circles[i].x, circles[i].y, radius);
        ctx.fillStyle.addColorStop(0, `hsla(${circles[i].color}, 70%, 15%, ${Math.round(Math.min(100, (1 - Math.abs(1 - circles[i].r * 2)) * 140))}%)`);
        ctx.fillStyle.addColorStop(1, 'hsla(' + circles[i].color + ', 70%, 15%, 0)');

        // Create the circle path and fill it
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Draw the semi-transparent black overlay
    overlayCtx.fillStyle = `rgba(0, 0, 0, ${overlayOpacity})`;
    overlayCtx.fillRect(0, 0, overlay.width, overlay.height);

    requestAnimationFrame(animate);
}  

// Main
createCircles();
requestAnimationFrame(animate);