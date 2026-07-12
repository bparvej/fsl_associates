const fallbackHeaderHTML = `
<div class="top-bar">
    <div class="container">
        <a href="tel:01921-303050"><i class="fas fa-phone"></i> 01921-303050</a>
        <a href="https://www.facebook.com/profile.php?id=61578124595569" target="_blank"><i class="fab fa-facebook"></i> Facebook Page</a>
    </div>
</div>

<header>
    <div class="nav-container">
        <div class="logo-area">
            <a href="index.html" class="logo-link">
                <img src="assets/images/logo.jpg" alt="Logo">
                <div class="site-title">Fair & Square Legal Associates</div>
            </a>
        </div>
        <div class="menu-toggle">
            <i class="fas fa-bars"></i>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="associates.html">Associates</a></li>
                <li><a href="appointment.php">Appointment</a></li>
                <li>
                    <a href="practices.html">Practice <i class="fas fa-chevron-down chevron-icon"></i></a>
                    <div class="dropdown-menu">
                        <a href="civil-law.html">Civil Law</a>
                        <a href="criminal-law.html">Criminal Law</a>
                        <a href="family-law.html">Family Law</a>
                        <a href="business-law.html">Business Law</a>
                        <a href="miscellaneous.html">Misc.</a>
                    </div>
                </li>
                <li><a href="csr.html">Free Consultancy</a></li>
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
                    <li><i class="fas fa-envelope"></i> fairandsquarelawfirm@gmail.com</li>
                    <li><i class="fas fa-phone"></i> 01921-303050</li>
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
        <div class="footer-cta">
            <a href="appointment.php" class="btn btn-appointment">Book an Appointment</a>
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

    const activateTab = (targetId) => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.style.display = 'none');
        
        const activeBtn = Array.from(tabBtns).find(b => b.dataset.tab === targetId);
        if (activeBtn) activeBtn.classList.add('active');
        
        const activeContent = document.getElementById(targetId);
        if (activeContent) activeContent.style.display = 'block';
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    });

    // Initialize the first tab (Paid Appointment) by default
    activateTab('appointment');
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
    if (window.location.pathname.includes('appointment.php')) {
        return;
    }
    
    // Create floating button for mobile
    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'appointment.php';
    floatingBtn.className = 'floating-appointment-btn';
    floatingBtn.innerHTML = 'Appointment';
    floatingBtn.title = 'Book an Appointment';
    document.body.appendChild(floatingBtn);
}

function setupWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/8801921303050';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.id = 'whatsapp-float';
    whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    whatsappBtn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(whatsappBtn);
}

function setupCallButton() {
    const callBtn = document.createElement('a');
    callBtn.href = 'tel:01921303050';
    callBtn.className = 'call-float';
    callBtn.id = 'call-float';
    callBtn.setAttribute('aria-label', 'Call Us');
    callBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>';
    document.body.appendChild(callBtn);
}

document.addEventListener('DOMContentLoaded', () => {
    loadFragment('#header-placeholder', 'header.html', fallbackHeaderHTML);
    loadFragment('#footer-placeholder', 'footer.html', fallbackFooterHTML);
    setupAdvocateSlider();
    setupActiveMenu();
    setupFloatingButton();
    setupWhatsAppButton();
    setupCallButton();
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
