const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

// Particle Class
class Particle {
    constructor() {
        this.size = Math.random() * 3 + 1;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.x = Math.random() * canvas.width;
        if (this.y > canvas.height || this.y < 0) this.y = Math.random() * canvas.height;
    }

    draw() {
        ctx.fillStyle = "rgba(0, 255, 127, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create Particles
function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < 150; i++) { // Increased particle count for better coverage
        particlesArray.push(new Particle());
    }
}

// Animate Particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particlesArray) {
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animateParticles);
}

// Resize Canvas on Window Resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); // Reinitialize particles on resize
});

initParticles();
animateParticles();
