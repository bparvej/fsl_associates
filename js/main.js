const fallbackHeaderHTML = `
<div class="top-bar">
    <div class="container">
        <a href="mailto:advocatemalamgir@gmail.com"><i class="fas fa-envelope"></i> advocatemalamgir@gmail.com</a>
        <a href="tel:01912-345528"><i class="fas fa-phone"></i> 01912-345528</a>
        <a href="https://www.facebook.com/profile.php?id=61578124595569" target="_blank"><i class="fab fa-facebook"></i> Facebook Page</a>
    </div>
</div>

<header>
    <div class="nav-container">
        <div class="logo-area">
            <a href="index.html" style="text-decoration: none; display: flex; align-items: center; gap: 15px;">
                <img src="assets/logo.jpg" alt="Logo" style="height: 50px;">
                <div class="site-title" style="color: #333;">Fair & Square Legal Associates</div>
            </a>
        </div>
        <div class="menu-toggle">
            <i class="fas fa-bars"></i>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="associates.html">Associates</a></li>
                <li>
                    <a href="#">Consultancy <i class="fas fa-chevron-down" style="font-size: 10px;"></i></a>
                    <div class="dropdown-menu" style="min-width: 240px;">
                        <span class="dropdown-header">Paid Consultation</span>
                        <a href="appointment.html">Online Consultation</a>
                        <a href="visit-consultation.html">Visit Consultation</a>
                        <div style="border-top: 1px solid #eee; margin: 5px 0;"></div>
                        <a href="ask-question.html">Free Consultation</a>
                    </div>
                </li>
                <li>
                    <a href="#">Practice <i class="fas fa-chevron-down" style="font-size: 10px;"></i></a>
                    <div class="dropdown-menu">
                        <a href="family-law.html">Family Law</a>
                        <a href="criminal-law.html">Criminal Law</a>
                        <a href="civil-law.html">Civil Law</a>
                        <a href="business-law.html">Business Law</a>
                        <a href="miscellaneous.html">Misc.</a>
                    </div>
                </li>
                <li><a href="csr.html">CSR</a></li>
                <li><a href="faq.html">FAQ</a></li>
            </ul>
        </nav>
    </div>
</header>
`;

const fallbackFooterHTML = `
<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col">
                <h3 class="serif">Fair & Square Legal Associates</h3>
                <p>Locally grounded, globally informed legal solutions for individuals and corporations worldwide.</p>
            </div>
            <div class="footer-col">
                <h3>Contact Us</h3>
                <ul class="footer-links">
                    <li><i class="fas fa-location-dot"></i> Nazma Law House, 50/1 Johnson Road, Dhaka-1100 (Level-2). Room no: 25 (Beside Star kabab & Restaurant and Opposite of DC Office)</li>
                    <li><i class="fas fa-envelope"></i> advocatemalamgir@gmail.com</li>
                    <li><i class="fas fa-phone"></i> 01912-345528</li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Follow Us</h3>
                <div class="social-icons">
                    <a href="https://www.facebook.com/profile.php?id=61578124595569" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-youtube"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div style="text-align: center; margin-bottom: 40px;">
            <a href="appointment.html" class="btn btn-appointment">Book an Appointment</a>
        </div>
        <div class="copyright">
            <p>&copy; 2026 Fair & Square Legal Associates All Rights Reserved</p>
        </div>
    </div>
</footer>
`;

function loadFragment(selector, url, fallbackHTML) {
    const container = document.querySelector(selector);
    if (!container) return;
    fetch(url)
        .then(response => response.ok ? response.text() : Promise.reject('Failed to load ' + url))
        .then(html => {
            container.innerHTML = html;
            // Only initialize header-specific events if we just loaded the header
            if (selector === '#header-placeholder') {
                initHeaderEvents();
            }
        })
        .catch(() => {
            container.innerHTML = fallbackHTML;
            if (selector === '#header-placeholder') {
                initHeaderEvents();
            }
        });
}

function initHeaderEvents() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
                header.style.padding = '10px 0';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                header.style.padding = '15px 0';
            }
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                    link.parentElement.classList.toggle('active-mobile');
                } else {
                    nav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }
}

function setupAdvocateSlider() {
    const slider = document.querySelector('.advocate-slider');
    if (!slider) return;
    const prev = document.querySelector('.slider-prev');
    const next = document.querySelector('.slider-next');

    const move = (direction) => {
        const step = slider.clientWidth * 0.8;
        slider.scrollBy({ left: direction * step, behavior: 'smooth' });
    };

    if (prev) prev.addEventListener('click', () => move(-1));
    if (next) next.addEventListener('click', () => move(1));
}

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentCount = Math.floor(progress * target);
                    counter.innerText = currentCount;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target;
                    }
                }
                requestAnimationFrame(update);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function initAppointmentTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.style.display = 'none');
            
            btn.classList.add('active');
            document.getElementById(target).style.display = 'block';
        });
    });
}

function setupActiveMenu() {
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav ul li a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && href === current) {
            a.parentElement.classList.add('active');
        }
    });
}

function setupFloatingButton() {
    // Don't show floating button on appointment page
    if (window.location.pathname.includes('appointment.html')) {
        return;
    }
    
    // Create floating button for mobile
    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'appointment.html';
    floatingBtn.className = 'floating-appointment-btn';
    floatingBtn.innerHTML = 'Appointment';
    floatingBtn.title = 'Book an Appointment';
    document.body.appendChild(floatingBtn);
}

document.addEventListener('DOMContentLoaded', () => {
    loadFragment('#header-placeholder', 'header.html', fallbackHeaderHTML);
    loadFragment('#footer-placeholder', 'footer.html', fallbackFooterHTML);
    setupAdvocateSlider();
    setupActiveMenu();
    setupFloatingButton();
    initCounterAnimation();
    initAppointmentTabs();

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
