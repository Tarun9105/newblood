import authManager from '../../js/auth.js';

// DOM Elements
const registerForm = document.getElementById('registerForm');
const submitBtn = document.querySelector('.submit-btn');

// Initialize auth manager
authManager.init();

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const bloodType = document.getElementById('bloodType').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Reset error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });

    let isValid = true;

    // Name validation
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Blood type validation
    if (!bloodType) {
        showError('bloodType', 'Please select your blood type');
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }

    // Terms validation
    if (!terms) {
        showError('terms', 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

// Show error message
function showError(fieldId, message) {
    const formGroup = document.getElementById(fieldId).closest('.form-group');
    formGroup.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
}

// Handle form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        bloodType: document.getElementById('bloodType').value,
        password: document.getElementById('password').value
    };

    try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

        // Register user
        await authManager.signUp(formData);

        // Show success message
        Toast.success('Account created successfully! Redirecting to dashboard...');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);

    } catch (error) {
        // Show error message
        Toast.error(error.message || 'Failed to create account');

        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Create Account</span>';
    }
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear(); 