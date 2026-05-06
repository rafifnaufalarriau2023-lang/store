/**
 * Navigasi antar section (SPA Style)
 */
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.getElementById(`nav-${sectionId}`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 3D Card Carousel Logic
 */
let currentSlide = 0;
let autoPlayInterval;

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const total = slides.length;

    slides.forEach((slide, index) => {
        // Calculate circular distance
        let dist = index - currentSlide;
        if (dist > total / 2) dist -= total;
        if (dist < -total / 2) dist += total;

        // Reset classes
        slide.classList.remove('active', 'prev-slide', 'next-slide', 'hidden-left', 'hidden-right', 'no-transition');

        if (dist === 0) {
            slide.classList.add('active');
        } else if (dist === -1 || (currentSlide === 0 && index === total - 1)) {
            slide.classList.add('prev-slide');
        } else if (dist === 1 || (currentSlide === total - 1 && index === 0)) {
            slide.classList.add('next-slide');
        } else {
            // Hidden slides - check if they need to teleport
            if (dist < 0) {
                slide.classList.add('hidden-left');
            } else {
                slide.classList.add('hidden-right');
            }
            // Optional: disable transition for slides far away to prevent crossing
            slide.classList.add('no-transition');
        }
    });
}

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const total = slides.length;
    currentSlide = (currentSlide + direction + total) % total;
    updateCarousel();
    resetAutoPlay();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

/**
 * Handle WhatsApp Redirect
 */
function setupOrderButtons() {
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card') || this.closest('.flash-poster');
            const itemName = card.querySelector('h3')?.innerText || card.querySelector('.poster-title')?.innerText;
            const itemPrice = card.querySelector('.price')?.innerText || card.querySelector('.poster-price')?.innerText;
            
            const whatsappNumber = "6287768804654"; // Nomor admin sesuai footer
            const message = `Halo Admin E-Football Store, saya berminat memesan:\n\n🔥 *Produk:* ${itemName}\n💰 *Harga:* ${itemPrice}\n\nMohon informasi selanjutnya ya. Terima kasih!`;
            
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    });
}

/**
 * Scroll Animations (Reveal on Scroll)
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .feature-card, .category-card').forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        
        // Add staggered delay for elements in the same grid/container
        const delay = (index % 4) * 0.1; 
        el.style.transitionDelay = `${delay}s`;
        
        observer.observe(el);
    });
}

// Flash Sale 3D Carousel Logic
let currentFlashSlide = 0;

function updateFlashCarousel() {
    const slides = document.querySelectorAll('.flash-slide');
    if (slides.length === 0) return;

    const total = slides.length;
    slides.forEach((slide, index) => {
        // Calculate circular distance
        let dist = index - currentFlashSlide;
        if (dist > total / 2) dist -= total;
        if (dist < -total / 2) dist += total;

        slide.classList.remove('active', 'prev-slide', 'next-slide', 'prev-2', 'next-2', 'hidden-left', 'hidden-right', 'no-transition');
        
        if (dist === 0) {
            slide.classList.add('active');
        } else if (dist === -1 || (currentFlashSlide === 0 && index === total - 1)) {
            slide.classList.add('prev-slide');
        } else if (dist === 1 || (currentFlashSlide === total - 1 && index === 0)) {
            slide.classList.add('next-slide');
        } else if (dist === -2 || (currentFlashSlide === 0 && index === total - 2) || (currentFlashSlide === 1 && index === total - 1)) {
            slide.classList.add('prev-2');
        } else if (dist === 2 || (currentFlashSlide === total - 1 && index === 1) || (currentFlashSlide === total - 2 && index === 0)) {
            slide.classList.add('next-2');
        } else {
            if (dist < 0) {
                slide.classList.add('hidden-left');
            } else {
                slide.classList.add('hidden-right');
            }
            slide.classList.add('no-transition');
        }
    });
}

function moveFlashSlide(direction) {
    const slides = document.querySelectorAll('.flash-slide');
    currentFlashSlide = (currentFlashSlide + direction + slides.length) % slides.length;
    updateFlashCarousel();
}

// Auto play flash carousel
setInterval(() => {
    moveFlashSlide(1);
}, 4000);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    updateCarousel();
    updateFlashCarousel();
    startAutoPlay();
    setupOrderButtons();
    setupScrollAnimations();
});

// FAQ Accordion Logic
function toggleFaq(element) {
    const item = element.parentElement;
    item.classList.toggle('active');
}
