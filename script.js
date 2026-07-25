// 1. INITIALIZE SMOOTH SCROLLING (Lenis)
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 1,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. TEXT CYCLER (Intro Section)
const wordCycler = document.getElementById('word-cycler');
let currentWordIndex = 0;
setInterval(() => {
    currentWordIndex++;
    if (currentWordIndex > 3) currentWordIndex = 0;
    wordCycler.style.transform = `translateY(-${currentWordIndex * 25}%)`;
}, 2500);


// 3. GSAP SCROLL ANIMATIONS (DOM)
gsap.registerPlugin(ScrollTrigger);

// Scroll Progress Line
gsap.to("#scroll-progress", {
    height: "100%",
    ease: "none",
    scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0.1 }
});

// Intro Elements Fade Out
gsap.to(".hero-text", {
    y: 0, opacity: 1, duration: 2, ease: "power4.out"
});
gsap.to(".hero-text", {
    opacity: 0, y: -100,
    scrollTrigger: { trigger: "#sec-intro", start: "top top", end: "bottom center", scrub: 1 }
});

// Milestones Reveal
gsap.utils.toArray('.milestone').forEach((milestone, i) => {
    gsap.to(milestone, {
        opacity: 1, x: 0, duration: 1,
        scrollTrigger: {
            trigger: milestone, start: "top 80%", toggleActions: "play none none reverse"
        }
    });
});

// The Loop Text Reveal
gsap.to(".loop-text", {
    opacity: 1, scale: 1, duration: 1.5,
    scrollTrigger: { trigger: "#sec-loop", start: "top center" }
});

// Break The Pattern 
gsap.to(".break-title", {
    opacity: 1, y: 0, duration: 1,
    scrollTrigger: { trigger: "#sec-break", start: "top 70%" }
});

gsap.from(".tech-node", {
    opacity: 0, y: 50, rotation: () => Math.random() * 40 - 20,
    stagger: 0.1, duration: 1, ease: "back.out(1.7)",
    scrollTrigger: { trigger: ".tech-nodes", start: "top 80%" }
});

// Workshop & Business Cards Staggered Fade In
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.to(title, {
        opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: title, start: "top 85%" }
    });
});

gsap.from(".workshop-item, .business-card", {
    opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: "power3.out",
    scrollTrigger: {
        trigger: ".workshop-item", start: "top 85%"
    }
});


// 4. THREE.JS CINEMATIC BACKGROUND SYSTEM
// This system morphs a massive particle field based on scroll position.

const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particle Setup
const particleCount = 4000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const originalPositions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const colorPalette = [
    new THREE.Color('#00f0ff'), // Electric Blue
    new THREE.Color('#ff4500'), // Warm Orange
    new THREE.Color('#00ff66'), // Emerald Green
    new THREE.Color('#ffffff')  // White
];

// Initial State: A Sphere (Intro)
for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Generate points on a sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const radius = 3 + (Math.random() * 0.5);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    originalPositions[i3] = positions[i3];
    originalPositions[i3 + 1] = positions[i3 + 1];
    originalPositions[i3 + 2] = positions[i3 + 2];

    const mixedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Premium additive blending material for that glowing, glowing aesthetic
const material = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8,
    depthWrite: false
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);
camera.position.z = 8;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.002;
    mouseY = (event.clientY - windowHalfY) * 0.002;
});

// Three.js Scroll State Machine
let scrollState = 0; // 0: Sphere, 1: Exploded/Path, 2: Galaxy, 3: Space

ScrollTrigger.create({
    trigger: "#sec-intro", start: "top top", end: "bottom top",
    onUpdate: (self) => { 
        particles.scale.set(1 + self.progress, 1 + self.progress, 1 + self.progress);
        material.opacity = 0.8 - (self.progress * 0.5);
    }
});

ScrollTrigger.create({
    trigger: "#sec-timeline", start: "top center",
    onEnter: () => scrollState = 1, onLeaveBack: () => scrollState = 0
});

ScrollTrigger.create({
    trigger: "#sec-workshop", start: "top center",
    onEnter: () => scrollState = 2, onLeaveBack: () => scrollState = 1
});

ScrollTrigger.create({
    trigger: "#sec-final", start: "top center",
    onEnter: () => scrollState = 3, onLeaveBack: () => scrollState = 2
});


const clock = new THREE.Clock();

function animateParticles() {
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    
    // Smooth camera mouse parallax
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    const elapsedTime = clock.getElapsedTime();
    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        if (scrollState === 0) {
            // Intro: Gently rotating sphere
            particles.rotation.y = elapsedTime * 0.1;
            particles.rotation.x = elapsedTime * 0.05;
        } 
        else if (scrollState === 1) {
            // Timeline: Particles drift apart slowly (simulate path environment)
            positions[i3] += Math.sin(elapsedTime + i) * 0.01;
            positions[i3 + 1] += Math.cos(elapsedTime + i) * 0.01;
        }
        else if (scrollState === 2) {
            // Workshop: Swirling galaxy / data stream
            const x = originalPositions[i3];
            const z = originalPositions[i3 + 2];
            positions[i3] = x * Math.cos(elapsedTime * 0.2) - z * Math.sin(elapsedTime * 0.2);
            positions[i3 + 2] = z * Math.cos(elapsedTime * 0.2) + x * Math.sin(elapsedTime * 0.2);
        }
        else if (scrollState === 3) {
            // Final: Deep space, particles fly past camera
            positions[i3 + 2] += 0.1;
            if (positions[i3 + 2] > 10) positions[i3 + 2] = -10;
        }
    }
    
    particles.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
