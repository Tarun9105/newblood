// DOM Elements
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// Form Data Object
const formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
};

// Initialize form event listeners
function initForm() {
    contactForm.addEventListener('submit', handleSubmit);
    
    // Add input event listeners for form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            formData[e.target.name] = e.target.value;
        });
    });
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    try {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showToast('Message sent successfully! We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
        Object.keys(formData).forEach(key => formData[key] = '');
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Update toast content and style
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize social links
function initSocialLinks() {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initSocialLinks();
}); 