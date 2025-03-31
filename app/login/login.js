import authManager from '../../js/auth.js';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const submitBtn = document.querySelector('.submit-btn');
const togglePasswordBtn = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('password');

// Initialize auth manager
authManager.init();

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.querySelector('i').classList.toggle('fa-eye');
    togglePasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
});

// Form validation
function validateForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Reset error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });

    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
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
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const formData = {
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
    };

    try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';

        // Sign in user
        await authManager.signIn(formData);

        // Show success message
        Toast.success('Successfully signed in! Redirecting to dashboard...');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);

    } catch (error) {
        // Show error message
        Toast.error(error.message || 'Failed to sign in');

        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Sign In</span>';
    }
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear(); 