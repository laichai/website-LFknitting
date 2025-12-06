// ============================================
// LF Knitting Website JavaScript
// Professional + Minimal Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // === Mobile Menu Toggle ===
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on menu button
            this.classList.toggle('active');
            // Toggle active class on nav
            nav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    // === Active Page Highlighting in Navigation ===
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // === Smooth Scroll for Anchor Links ===
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only proceed if it's not just "#"
            if (targetId !== '#' && targetId !== '') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // === Scroll to Top Button (Optional - can be added to HTML if needed) ===
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === Header Shadow on Scroll ===
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 10) {
                header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // === Lazy Loading for Images (if needed in future) ===
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // === Form Validation (for future contact forms) ===
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const name = this.querySelector('[name="name"]').value.trim();
            const email = this.querySelector('[name="email"]').value.trim();
            const message = this.querySelector('[name="message"]').value.trim();

            if (!name || !email || !message) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('กรุณากรอกอีเมลให้ถูกต้อง');
                return false;
            }

            // If validation passes, you can submit the form
            alert('ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อเรา');
            this.reset();
        });
    }

    // === Product Category Filter (for products page - optional) ===
    const categoryButtons = document.querySelectorAll('[data-category]');
    const productCards = document.querySelectorAll('[data-product-category]');

    if (categoryButtons.length > 0 && productCards.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');

                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter products
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-product-category') === category) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        card.style.animation = 'fadeIn 0.3s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // === Animation on Scroll (Optional - for future enhancements) ===
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window && animateOnScroll.length > 0) {
        const scrollObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });

        animateOnScroll.forEach(function(element) {
            scrollObserver.observe(element);
        });
    }

    // === Console Log for Development ===
    console.log('LF Knitting Website Loaded Successfully');
    console.log('Professional + Minimal Design by Claude');

});

// === Utility Functions ===

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format phone number for tel: links
function formatPhoneLink(phoneNumber) {
    return phoneNumber.replace(/\s/g, '').replace(/-/g, '');
}
