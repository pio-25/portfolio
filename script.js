/* ============================================
   PORTFOLIO DASHBOARD - MAIN JAVASCRIPT
   ============================================ */

let terminalTypingTimeout;
let audioCtx;

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initLoadingScreen();
    initParticles();
    initTypingEffect();
    initNavbar();
    initMobileMenu();
    initCombinedObservers();
    initCardTilt();
    initCopyToClipboard();
    initSmoothScroll();
    initActiveNavLinks();
    initAOS();
    initCustomCursor();
    initGhostClickEffect();
    initTerminalObserver();
    initSoundEffects();
});

/* ============================================
   LOADING SCREEN
   ============================================ */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000); // Reduced delay for better UX
    });
}

/* ============================================
   PARTICLE BACKGROUND (Canvas API)
   ============================================ */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.4 + 0.55;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 15000), 100);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        const maxDistance = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.7;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    init();
    animate();
}

/* ============================================
   TYPING / TYPEWRITER EFFECT
   ============================================ */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const roles = [
        'Creative UI Designer',
        'Product Designer',
        'UI & Visual Designer',
        'User Interface Designer',
        'UI/UX Design Enthusiast',
        'Visual Experience Designer',
        'Interactive UI Designer',
        'User-Centered Designer',
        'Modern UI Designer',
        'Web Designer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ============================================
   COMBINED SCROLL OBSERVERS
   ============================================ */
function initCombinedObservers() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "-10% 0px -70% 0px" // Better for detecting active section
    };

    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Update Active Nav Link
                const id = entry.target.getAttribute('id');
                if (id) {
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }

                // Handle internal bar animations (Skills and XP)
                const fills = entry.target.querySelectorAll('.skill-fill, .soft-skill-fill, .xp-fill');
                fills.forEach(fill => {
                    // Generic regex to extract numbers from classes like 'percent-85' or 'xp-fill-75'
                    const classes = Array.from(fill.classList);
                    const percentClass = classes.find(c => /(percent|fill)-(\d+)/.test(c));
                    if (percentClass) {
                        const percent = percentClass.match(/\d+/)[0] + '%';
                        fill.style.width = percent;
                    }
                });
            } else {
                entry.target.classList.remove('in-view');
                const fills = entry.target.querySelectorAll('.skill-fill, .soft-skill-fill, .xp-fill');
                fills.forEach(fill => fill.style.width = '0');
            }
        });
    }, observerOptions);

    // Observe sections for nav updates and cards for animations
    const animateItems = document.querySelectorAll('section[id], .skill-item, .soft-skill-card, .profile-card-3d');
    animateItems.forEach(item => observer.observe(item));
}

/* ============================================
   CARD TILT EFFECT
   ============================================ */
function initCardTilt() {
    const cards = document.querySelectorAll('.mission-card, .profile-card-3d, .about-card, .internship-card, .persona-card, .insight-card, .user-story-card, .solution-card, .sorting-col');

    cards.forEach(card => {
        const imageContainer = card.querySelector('.profile-image-container');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

            if (imageContainer) {
                // Parallax effect for the avatar
                imageContainer.style.transform = `translateZ(30px) translateY(${rotateX * -0.5}px) translateX(${rotateY * 0.5}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            if (imageContainer) {
                imageContainer.style.transform = 'translateZ(0) translateY(0) translateX(0)';
            }
        });
    });
}

/* ============================================
   COPY TO CLIPBOARD
   ============================================ */
function initCopyToClipboard() {
    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(item => {
        const textToCopy = item.dataset.copy;
        if (!textToCopy) return;

        const copyButton = item.querySelector('.copy-btn'); // Get the actual button

        item.addEventListener('click', () => {
            navigator.clipboard.writeText(textToCopy).then(() => {
                if (copyButton) { // Make sure the button exists
                    copyButton.classList.add('copied');
                    copyButton.innerHTML = '<i class="fas fa-check"></i>'; // Change the button's icon

                    showToast('Copied to clipboard!');

                    setTimeout(() => {
                        copyButton.classList.remove('copied');
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>'; // Revert button's icon
                    }, 2000);
                }
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast('Copied to clipboard!');
            });
        });
    });
}

/* ============================================
   TOAST NOTIFICATION
   ============================================ */
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initActiveNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!navLinks.length || !sections.length) return;

    const setActiveLink = (sectionId) => {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    };

    const updateActiveLink = () => {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
        const scrollPosition = window.scrollY + navbarHeight + 10;

        let currentSectionId = sections[0]?.id || 'hero';

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentSectionId = section.id;
            }
        });

        setActiveLink(currentSectionId);
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', () => setTimeout(updateActiveLink, 350));
    });

    updateActiveLink();
}

/* ============================================
   AOS INITIALIZATION
   ============================================ */
function initAOS() {
    if (typeof AOS === 'undefined') return;

    AOS.init({
        duration: 800,
        once: false,
        offset: 60,            // smaller offset = more reliable trigger on short mobile screens
        easing: 'ease-out-cubic'
    });

    // Recalculate positions AFTER fonts/images load and after the loading
    // screen is gone — this is what fixes animations not firing on mobile.
    const refresh = () => AOS.refreshHard();

    window.addEventListener('load', refresh);
    window.addEventListener('resize', refresh);
    window.addEventListener('orientationchange', refresh);
    // loading screen hides ~1000ms after load; refresh just after that
    setTimeout(refresh, 1300);
}


/* ============================================
   TERMINAL COMMAND TYPING
   ============================================ */
function initTerminalTyping() {
    const commandElement = document.getElementById('terminal-command');
    if (!commandElement) return;

    clearTimeout(terminalTypingTimeout);
    commandElement.textContent = '';

    const command = 'connect --creative-designer --portfolio';
    let index = 0;

    function typeCommand() {
        if (index < command.length) {
            commandElement.textContent += command.charAt(index);
            index++;
            terminalTypingTimeout = setTimeout(typeCommand, 80);
        }
    }

    terminalTypingTimeout = setTimeout(typeCommand, 1000);
}

function initTerminalObserver() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initTerminalTyping();
            } else {
                clearTimeout(terminalTypingTimeout);
                const commandElement = document.getElementById('terminal-command');
                if (commandElement) commandElement.textContent = '';
            }
        });
    }, { threshold: 0.2 });

    observer.observe(contactSection);
}

/* ============================================
   CUSTOM PIXEL CURSOR
   ============================================ */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    // Check if touch device - hide cursor
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        cursor.style.display = 'none';
        return;
    }

    // Cursor position tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Smooth cursor following with ease
    const ease = 0.2;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight;

        // Boundary Clamping: Ensures the ghost stays fully on screen
        const minX = 14; // half of 28px width
        const maxX = viewportWidth - 24; // Keep center 24px from right edge/scrollbar
        const minY = 18; // half of 36px height
        const maxY = viewportHeight - 18;

        mouseX = Math.max(minX, Math.min(e.clientX, maxX));
        mouseY = Math.max(minY, Math.min(e.clientY, maxY));

        // Dynamic Opacity: Fades out near the right edge to prevent visual "popping"
        const distToRight = viewportWidth - e.clientX;
        if (distToRight <= 20) {
            cursor.style.opacity = '0';
            cursor.style.pointerEvents = 'none';
            document.body.classList.add('show-native-cursor');
        } else if (distToRight <= 40) {
            // Smoothly interpolate opacity between 20px (0) and 40px (1)
            const opacity = (distToRight - 20) / 20;
            cursor.style.opacity = opacity.toString();
            cursor.style.pointerEvents = 'none';
            document.body.classList.remove('show-native-cursor');
        } else {
            cursor.style.opacity = '1';
            cursor.style.pointerEvents = 'none';
            document.body.classList.remove('show-native-cursor');
        }
    });

    // Animate cursor position
    function animateCursor() {
        // Smooth easing interpolation
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    // Start cursor animation
    animateCursor();

    // Interactive elements that change cursor
    const interactiveElements = document.querySelectorAll(
        'a, button, .nav-link, .btn, .contact-item, .mission-card, ' +
        '.soft-skill-card, .skill-item, .copy-btn, .gallery-card, .card-inner, input, textarea, [role="button"]'
    );

    // Add hover effects
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            createAirPuff(cursorX + window.scrollX, cursorY + window.scrollY);
            playSound('puff');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });

    // Click effects
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

/* ============================================
   GHOST CLICK EFFECT
   ============================================ */
function initGhostClickEffect() {
    document.addEventListener('click', (e) => {
        playSound('pop');

        const ghost = document.createElement('div');
        ghost.className = 'ghost-print';
        ghost.innerHTML = `
            <div class="ghost-body"></div>
            <div class="ghost-eyes">
                <div class="ghost-eye left"></div>
                <div class="ghost-eye right"></div>
            </div>
            <div class="ghost-mouth"></div>
            <div class="ghost-cheeks">
                <div class="ghost-cheek left"></div>
                <div class="ghost-cheek right"></div>
            </div>
            <div class="ghost-tail"></div>
        `;

        ghost.style.left = e.pageX + 'px';
        ghost.style.top = e.pageY + 'px';

        // Trigger air puff at click position together with ghost print
        createAirPuff(e.pageX, e.pageY);

        // Append to body and ensure it's on top of everything
        document.body.appendChild(ghost);

        // Remove from DOM after animation finishes (1000ms to be safe)
        setTimeout(() => {
            ghost.remove();
        }, 1000);
    });
}

/* ============================================
   AIR PUFF PARTICLE GENERATOR
   ============================================ */
function createAirPuff(x, y) {
    const particleCount = 6;
    for (let i = 0; i < particleCount; i++) {
        const puff = document.createElement('div');
        puff.className = 'puff-particle';

        const angle = Math.PI / 2 + (Math.random() - 0.5) * 1.5;
        const velocity = 15 + Math.random() * 20;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        puff.style.left = x + 'px';
        puff.style.top = (y - 2) + 'px';
        puff.style.setProperty('--dx', `${dx}px`);
        puff.style.setProperty('--dy', `${dy}px`);

        document.body.appendChild(puff);
        setTimeout(() => puff.remove(), 700);
    }
}

/* ============================================
   SOUND EFFECTS (Soft Pop & Air Puff)
   ============================================ */
function initSoundEffects() {
    // Synthesis Mode: No file preloading needed.
    // We initialize/resume the AudioContext on the first real user gesture
    // to comply with browser autoplay policies and prevent console warnings.
    const unlockAudio = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    };

    // These events are recognized as valid user gestures by all major browsers
    ['mousedown', 'keydown', 'touchstart'].forEach(type => {
        window.addEventListener(type, unlockAudio, { once: true });
    });
}

function playSound(type) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Guard: Only proceed if the AudioContext is initialized and running.
    // This silently skips sound attempts on hover before the first user click.
    if (!audioCtx || audioCtx.state !== 'running') return;

    if (type === 'pop') {
        const freq = 700 + Math.random() * 300; // Randomized pitch for unique clicks
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.3, audioCtx.currentTime); // Increased volume
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'puff') {
        const bufferSize = audioCtx.sampleRate * 0.1;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime); // Increased volume for better audibility
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
    }
}
