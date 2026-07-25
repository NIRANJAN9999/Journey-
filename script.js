// --- 1. BOOT SEQUENCE ---
const logs = [
    "Connecting to /dev/ttyUSB0...",
    "esptool.py v4.6.2",
    "Found 1 serial ports",
    "Serial port /dev/ttyUSB0",
    "Connecting....",
    "Chip is ESP32-S3 (revision v0.1)",
    "Features: WiFi, BLE",
    "Crystal is 40MHz",
    "Uploading stub...",
    "Running stub...",
    "Stub running...",
    "Configuring flash size...",
    "Wrote 17856 bytes at 0x00000000 in 0.3 seconds...",
    "Hash of data verified.",
    "Hard resetting via RTS pin...",
    ">> SYSTEM BOOT COMPLETE <<"
];

const bootText = document.getElementById('boot-text');
const bootScreen = document.getElementById('boot-screen');
const bootCursor = document.getElementById('boot-cursor');
const mainContent = document.getElementById('main-content');
const mainNav = document.getElementById('main-nav');
let currentLog = 0;

function printLog() {
    if (currentLog < logs.length) {
        const div = document.createElement('div');
        div.textContent = logs[currentLog];
        if (currentLog === logs.length - 1) {
            div.className = 'text-copper mt-4';
        } else {
            div.className = 'text-offwhite/80';
        }
        bootText.appendChild(div);
        currentLog++;
        setTimeout(printLog, Math.random() * 150 + 50);
    } else {
        bootCursor.style.display = 'none';
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            mainContent.style.opacity = '1';
            mainNav.style.opacity = '1';
            
            setTimeout(() => {
                bootScreen.style.display = 'none';
                initScrollAnimations();
            }, 1000);
        }, 800);
    }
}
setTimeout(printLog, 500);


// --- 2. SMOOTH SCROLLING (Lenis) & GSAP ---
function initScrollAnimations() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate the Copper PCB trace line
    gsap.to("#trace-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1
        }
    });

    // Make nav links use smooth scroll
    document.querySelectorAll('.nav-node').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            lenis.scrollTo(targetId);
        });
    });
}