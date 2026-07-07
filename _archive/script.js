/* ============================================
   CINEMATIC PORTFOLIO — Interactive Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initNeuralCanvas();
    initNavigation();
    initHeroReveal();
    initRoleCarousel();
    initScrollReveal();
    initMetricCounters();
    initTiltCards();
    initSmoothScroll();
    initActiveNav();
});

/* ============================================
   CINEMATIC LOADER
   ============================================ */

function initLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 2000);
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */

function initCustomCursor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover detection
    const hoverElements = 'a, button, .btn-magnetic, .btn-outline-glow, .chip, .skill-pill, .project-tile, .profile-tile, .info-card, .achieve-item, .cert-item, .contact-block, .social-circle';

    document.querySelectorAll(hoverElements).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
        document.querySelectorAll(hoverElements).forEach(el => {
            if (!el.dataset.cursorBound) {
                el.dataset.cursorBound = 'true';
                el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        trailX += (mouseX - trailX) * 0.08;
        trailY += (mouseY - trailY) * 0.08;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}

/* ============================================
   NEURAL NETWORK CANVAS
   ============================================ */

function initNeuralCanvas() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let mouseX = 0, mouseY = 0;
    const NODE_COUNT = 80;
    const CONNECTION_DISTANCE = 200;
    const MOUSE_INFLUENCE = 250;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }
    }

    function drawFrame() {
        ctx.clearRect(0, 0, width, height);

        // Update nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            // Mouse influence
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_INFLUENCE) {
                const force = (MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE * 0.01;
                node.vx += dx * force;
                node.vy += dy * force;
            }

            // Damping
            node.vx *= 0.99;
            node.vy *= 0.99;
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DISTANCE) {
                    const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.fillStyle = `rgba(167, 139, 250, ${node.opacity})`;
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(drawFrame);
    }

    resize();
    createNodes();
    drawFrame();

    window.addEventListener('resize', () => {
        resize();
        createNodes();
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
}

/* ============================================
   NAVIGATION
   ============================================ */

function initNavigation() {
    const nav = document.getElementById('nav');
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            burger.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ============================================
   HERO TEXT REVEAL
   ============================================ */

function initHeroReveal() {
    const reveals = document.querySelectorAll('.reveal-text');

    // Wait for loader
    setTimeout(() => {
        reveals.forEach(el => {
            const delay = parseFloat(el.dataset.delay) || 0;
            setTimeout(() => {
                el.classList.add('visible');
            }, delay * 1000);
        });
    }, 1800);
}

/* ============================================
   ROLE CAROUSEL (Netflix-style vertical slide)
   ============================================ */

function initRoleCarousel() {
    const track = document.getElementById('roleTrack');
    const items = track.querySelectorAll('.role-item');
    let currentIndex = 0;
    const itemHeight = 44;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        track.style.transform = `translateY(-${currentIndex * itemHeight}px)`;
    }, 3000);
}

/* ============================================
   SCROLL REVEAL
   ============================================ */

function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.section .section-label, .section .big-heading, .section .about-layout, ' +
        '.section .exp-spotlight, .section .project-spotlight, .section .project-row, ' +
        '.section .skills-masonry, .section .achieve-layout, .section .profiles-row, ' +
        '.section .contact-mega'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    targets.forEach(t => observer.observe(t));
}

/* ============================================
   METRIC COUNTERS
   ============================================ */

function initMetricCounters() {
    const metrics = document.querySelectorAll('.metric-value[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target, parseInt(entry.target.dataset.count));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(m => observer.observe(m));
}

function animateCount(el, target) {
    const duration = 2200;
    const start = performance.now();

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    }

    requestAnimationFrame(tick);
}

/* ============================================
   3D TILT CARDS
   ============================================ */

function initTiltCards() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.transition = 'transform 0.5s ease';
            setTimeout(() => card.style.transition = '', 500);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   ACTIVE NAV TRACKING
   ============================================ */

function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(s => observer.observe(s));
}
