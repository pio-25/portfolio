/* ============================================
   PORTFOLIO INTERACTIVE ENGINE
   Game Dashboard Experience
   ============================================ */

let hasShownWelcomeToast = false;

// Init particles early for behind-loader rendering
window.addEventListener('load', () => {
    initParticles();
});

// Loader on window.onload - EVERY reload
window.addEventListener('load', () => {
    initAlwaysGameLoader();
});

function initAlwaysGameLoader() {
    const loader = document.getElementById('gameLoader');
    const progressBar = document.getElementById('loaderProgress');
    const progressText = document.getElementById('loaderText');
    const mainContent = document.getElementById('main-content');

    if (!loader || !mainContent) return;

    // ALWAYS hide main content
    mainContent.classList.add('loading-hidden');

    // Reset loader state
    loader.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    let progress = 0;
    const statuses = [
        'Loading core systems...',
        'Scanning player profile...',
        'Initializing missions...',
        'Loading skill tree...',
        'Establishing comms...',
        'Player dashboard ready!',
        'Welcome aboard, Commander!'
    ];
    let statusIndex = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 5 + 1.5;
        if (progress >= 100) {
            progress = 100;
            progressBar.style.width = '100%';
            progressText.textContent = '100%';

            // Final status
            statusIndex = statuses.length - 1;
            updateStatus();

            clearInterval(interval);
            setTimeout(() => {
                // Smooth reveal main content
                loader.classList.add('hidden');
                mainContent.classList.remove('loading-hidden');
                mainContent.classList.add('loading-visible');

                // Init UI after reveal
                setTimeout(() => {
                    initTypewriter();
                    initScrollProgress();
                    initHUD();
                    initSkillBars();
                    initProjectModals();
                    initScrollAnimations();
                    initMobileMenu();
                    showWelcomeToast();
                }, 100); // Tiny delay for smooth transition
            }, 600); // Pause at 100%
        } else {
            progressBar.style.width = Math.floor(progress) + '%';
            progressText.textContent = Math.floor(progress) + '%';
        }

        if (progress >= (statusIndex + 1) * 15 && statusIndex < statuses.length - 1) {
            statusIndex++;
            updateStatus();
        }
    }, 60);

    function updateStatus() {
        const statusEl = document.getElementById('loaderStatusText');
        if (statusEl && statuses[statusIndex]) {
            statusEl.textContent = statuses[statusIndex];
        }
    }
}

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
function initTypewriter() {
    const text = 'Pranali Nalavde';
    const element = document.getElementById('typewriter');
    const heroSection = document.getElementById('hero');
    if (!element) return;

    let index = 0;
    let timeoutId = null;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            timeoutId = setTimeout(type, 100);
        }
    }

    function resetAndType() {
        element.textContent = '';
        index = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        setTimeout(type, 100);
    }

    resetAndType();

    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                    resetAndType();
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: [0.25]
        });

        observer.observe(heroSection);
    }
}

/* ============================================
   PARTICLE BACKGROUND
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
            this.opacity = Math.random() * 0.8 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(231, 8, 102, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticlesArray() {
        particles = [];
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(231, 8, 102, ${0.28 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.8;
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
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    initParticlesArray();
    animate();
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    const hudNav = document.getElementById('hudNav');
    if (!progressBar || !hudNav) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;

        progressBar.style.width = `${progress}%`;

        if (scrollTop > 50) {
            hudNav.classList.add('scrolled');
        } else {
            hudNav.classList.remove('scrolled');
        }
    });
}

/* ============================================
   HUD NAVIGATION - ACTIVE SECTION TRACKING
   ============================================ */
function initHUD() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.hud-link');
    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const level = item.dataset.level;
                const fill = item.querySelector('.skill-fill');

                item.classList.add('visible');
                if (fill) {
                    setTimeout(() => {
                        fill.style.width = `${level}%`;
                    }, 200);
                }

                observer.unobserve(item);
            }
        });
    }, { threshold: 0.3 });

    skillItems.forEach(item => observer.observe(item));
}

/* ============================================
   PROJECT MODALS
   ============================================ */
function initProjectModals() {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    if (!overlay || !content) return;

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    window.openModal = function (projectId) {
        const projectData = getProjectData(projectId);
        content.innerHTML = projectData;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function () {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    function getProjectData(id) {
        const projects = {
            animation: `
                <h2><i class="fas fa-film"></i> Animation Project</h2>
                <p class="modal-subtitle">Creative animation design using Canva</p>
                <h3><i class="fas fa-info-circle"></i> Overview</h3>
                <p>A visually engaging animation project created using Canva's design and motion tools. The project demonstrates visual storytelling skills and creative design thinking.</p>
                <h3><i class="fas fa-tools"></i> Tools Used</h3>
                <div class="modal-tech">
                    <span class="tech-tag">Canva</span>
                    <span class="tech-tag">Motion Graphics</span>
                    <span class="tech-tag">Visual Design</span>
                </div>
                <h3><i class="fas fa-star"></i> Key Highlights</h3>
                <ul>
                    <li>Created engaging animated visuals for storytelling</li>
                    <li>Demonstrated proficiency in Canva's animation features</li>
                    <li>Applied design principles for motion graphics</li>
                </ul>
                <a href="https://canva.link/7ovgtn6vdoasof6" target="_blank" rel="noopener noreferrer" class="modal-link">
                    <i class="fas fa-external-link-alt"></i> View Project
                </a>
            `,
            smarket: `
                <h2><i class="fas fa-shopping-bag"></i> Smarket Application</h2>
                <p class="modal-subtitle">Full-Stack E-Commerce Platform for Handmade Crafts</p>
                <h3><i class="fas fa-info-circle"></i> Overview</h3>
                <p>Smarket is a comprehensive full-stack e-commerce platform built for selling handmade crafts. It features real-time chat, admin dashboards, payment integration, and a multi-role user system (Admin, Seller, Buyer).</p>
                <h3><i class="fas fa-tools"></i> Technologies Used</h3>
                <div class="modal-tech">
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">Flask</span>
                    <span class="tech-tag">MySQL</span>
                    <span class="tech-tag">SQLAlchemy</span>
                    <span class="tech-tag">Socket.IO</span>
                    <span class="tech-tag">JavaScript</span>
                    <span class="tech-tag">HTML/CSS</span>
                </div>
                <h3><i class="fas fa-star"></i> Key Features</h3>
                <ul>
                    <li>Real-time chat system between buyers and sellers</li>
                    <li>Admin dashboard with sales analytics and reporting</li>
                    <li>Product approval workflow for quality control</li>
                    <li>Cart and wishlist functionality</li>
                    <li>Order management with tracking</li>
                    <li>Payment integration with invoice generation</li>
                </ul>
                <a href="#" class="modal-link" onclick="event.preventDefault(); showToast('This is a private project. Contact for demo access.');">
                    <i class="fas fa-lock"></i> Private Repository
                </a>
            `,
            react: `
                <h2><i class="fab fa-react"></i> React Internship Project</h2>
                <p class="modal-subtitle">Handmade Crafts Marketplace - Frontend Application</p>
                <h3><i class="fas fa-info-circle"></i> Overview</h3>
                <p>A React-based frontend application for the Smarket marketplace, built during the internship at CGPI. Features product catalog, shopping cart, routing, and responsive design.</p>
                <h3><i class="fas fa-tools"></i> Technologies Used</h3>
                <div class="modal-tech">
                    <span class="tech-tag">React.js</span>
                    <span class="tech-tag">React Router</span>
                    <span class="tech-tag">Context API</span>
                    <span class="tech-tag">HTML5</span>
                    <span class="tech-tag">CSS3</span>
                    <span class="tech-tag">JavaScript</span>
                </div>
                <h3><i class="fas fa-star"></i> Key Features</h3>
                <ul>
                    <li>Responsive product catalog with filtering</li>
                    <li>Shopping cart with add/remove functionality</li>
                    <li>Multi-page routing with React Router</li>
                    <li>Product detail pages with related items</li>
                    <li>About and Contact sections</li>
                </ul>
                <a href="https://pio-25.github.io/smarket-project/" target="_blank" rel="noopener noreferrer" class="modal-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            `
        };

        return projects[id] || '<p>Project not found.</p>';
    }
}

/* ============================================
   SCROLL ANIMATIONS (REVEAL ON SCROLL)
   ============================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .project-card, .timeline-item');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
function initMobileMenu() {
    const toggle = document.getElementById('hudToggle');
    const menu = document.getElementById('hudMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-trophy"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function showWelcomeToast() {
    if (hasShownWelcomeToast) return;
    hasShownWelcomeToast = true;

    // No delay - instant on call (after loader)
    showToast('Welcome to my Player Dashboard!');
}

/* ============================================
   ACHIEVEMENT UNLOCK ON SCROLL
   ============================================ */
let achievementsTriggered = false;

function initAchievementUnlock() {
    const achievementsSection = document.querySelector('.achievements-panel');
    if (!achievementsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !achievementsTriggered) {
                achievementsTriggered = true;
                const achievements = entry.target.querySelectorAll('.achievement');
                achievements.forEach((achievement, index) => {
                    setTimeout(() => {
                        achievement.style.transition = 'transform 0.2s ease';
                        achievement.style.transform = 'scale(1.15)';
                        setTimeout(() => {
                            achievement.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(achievementsSection);
}

// Initialize achievement unlock
initAchievementUnlock();

/* ============================================
   GAME LOADER
   ============================================ */
function initGameLoader() {
    const loader = document.getElementById('gameLoader');
    const progressBar = document.getElementById('loaderProgress');
    const progressText = document.getElementById('loaderText');

    if (!loader || sessionStorage.getItem('loaderShown')) {
        loader?.classList.add('hidden');
        document.body.style.overflow = 'auto';
        return;
    }

    let progress = 0;
    const statuses = [
        'Loading core systems...',
        'Scanning player profile...',
        'Initializing missions...',
        'Loading skill tree...',
        'Establishing comms...',
        'Player dashboard ready!',
        'Welcome aboard, Commander!'
    ];
    let statusIndex = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 5 + 1.5; // Controlled increment
        if (progress >= 100) {
            progress = 100;
            progressBar.style.width = '100%';
            progressText.textContent = '100%';

            // Final status
            statusIndex = statuses.length - 1;
            updateStatus();

            // Hide ONLY after reaching exactly 100%
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
                sessionStorage.setItem('loaderShown', 'true');
            }, 800); // Brief pause at 100%
        } else {
            progressBar.style.width = Math.floor(progress) + '%';
            progressText.textContent = Math.floor(progress) + '%';
        }

        // Update status every ~15%
        if (progress >= (statusIndex + 1) * 15 && statusIndex < statuses.length - 1) {
            statusIndex++;
            updateStatus();
        }
    }, 60);

    function updateStatus() {
        const statusEl = document.getElementById('loaderStatusText');
        if (statusEl && statuses[statusIndex]) {
            statusEl.textContent = statuses[statusIndex];
        }
    }
}




