// Page Management
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const pageElement = document.getElementById(pageId + 'Page');
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Initialize animations for the page
    setTimeout(initAnimations, 100);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initAnimations();
});

function setupEventListeners() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Email input for reply-to
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const replytoInput = document.getElementById('replytoInput');
            if (replytoInput) {
                replytoInput.value = this.value;
            }
        });
    }
    
    // Scroll animations
    window.addEventListener('scroll', checkScroll);
}

// Contact Form Handling
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const replytoInput = document.getElementById('replytoInput');
    if (replytoInput) {
        replytoInput.value = email;
    }
    
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (submitText) submitText.style.display = 'none';
    if (loadingSpinner) loadingSpinner.style.display = 'block';
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.add('show');
                successMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
                form.reset();
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 10000);
            }
        } else {
            alert('There was an error submitting your message. Please try again or email us directly at info@homesteadconstruction.com');
        }
    } catch (error) {
        alert('Network error. Please check your connection and try again, or email us directly at info@homesteadconstruction.com');
        console.error('Form submission error:', error);
    } finally {
        if (submitText) submitText.style.display = 'block';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    }
}

// Animation Functions
function initAnimations() {
    checkScroll();
}

function checkScroll() {
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (aboutText && isElementInViewport(aboutText)) {
        aboutText.classList.add('animated');
    }
    
    if (aboutImage && isElementInViewport(aboutImage)) {
        aboutImage.classList.add('animated');
    }
    
    serviceCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 200);
        }
    });
}

function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}
