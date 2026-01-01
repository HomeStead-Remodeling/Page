const logoUrls = {
    header: "https://via.placeholder.com/200x50/2ecc71/ffffff?text=YOUR+LOGO+HERE",
    footer: "https://via.placeholder.com/250x60/2ecc71/ffffff?text=YOUR+LOGO+HERE" 
};

document.addEventListener('DOMContentLoaded', function() {
    const headerLogo = document.getElementById('headerLogo');
    const footerLogo = document.getElementById('footerLogo');
    if (headerLogo) headerLogo.src = logoUrls.header;
    if (footerLogo) footerLogo.src = logoUrls.footer;
    checkScroll();
    setupEventListeners();
});
function setupEventListeners() {
    const contactScrollBtn = document.getElementById('contactScrollBtn');
    if (contactScrollBtn) {
        contactScrollBtn.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
        });
    }
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({behavior: 'smooth'});
        });
    }
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const replytoInput = document.getElementById('replytoInput');
            if (replytoInput) {
                replytoInput.value = this.value;
            }
        });
    }
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    window.addEventListener('scroll', checkScroll);
}
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
            // Show success message
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
            alert('There was an error submitting your message. Please try again or email us directly at 123@abc.com');
        }
    } catch (error) {
        alert('Network error. Please check your connection and try again, or email us directly at 123@abc.com');
        console.error('Form submission error:', error);
    } finally {
        if (submitText) submitText.style.display = 'block';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    }
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
