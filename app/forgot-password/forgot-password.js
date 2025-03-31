import authManager from '../../js/auth.js';

// DOM Elements
const resetForm = document.getElementById('resetForm');
const successMessage = document.querySelector('.success-message');
const submitBtn = document.querySelector('.submit-btn');
const tryAgainButton = document.getElementById('tryAgainButton');
const toast = document.getElementById('toast');

// Initialize auth manager
authManager.init();

// Show Toast Notification
function showToast(title, message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Handle form submission
resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Send password reset email
        await authManager.resetPassword(email);
        
        // Show success message
        resetForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Show success toast
        showToast(
            'Password Reset Email Sent',
            'Please check your email for password reset instructions.'
        );
        
    } catch (error) {
        // Show error message
        showToast(
            'Error',
            error.message || 'Failed to send password reset email. Please try again.',
            'error'
        );
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Reset Instructions</span>';
    }
});

// Handle Try Again
function handleTryAgain() {
    resetForm.classList.remove('hidden');
    successMessage.classList.add('hidden');
    resetForm.reset();
}

// Initialize Event Listeners
function initEventListeners() {
    resetForm.addEventListener('submit', handleSubmit);
    tryAgainButton.addEventListener('click', handleTryAgain);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear(); 