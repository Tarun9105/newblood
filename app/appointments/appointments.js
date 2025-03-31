// DOM Elements
const appointmentForm = document.getElementById('appointmentForm');
const toast = document.getElementById('toast');

// Form Data Object
const formData = {
    name: '',
    email: '',
    phone: '',
    bloodType: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
    type: 'donation'
};

// Initialize Form
function initForm() {
    // Add event listeners to form inputs
    const inputs = appointmentForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            formData[e.target.name] = e.target.value;
        });
    });

    // Handle form submission
    appointmentForm.addEventListener('submit', handleSubmit);
}

// Handle Form Submission
async function handleSubmit(e) {
    e.preventDefault();

    // Show loading state
    const submitButton = appointmentForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Scheduling...';
    submitButton.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showToast('Appointment Requested', 'We\'ll contact you shortly to confirm your appointment.', 'success');

        // Reset form
        appointmentForm.reset();
        Object.keys(formData).forEach(key => formData[key] = '');

    } catch (error) {
        // Show error message
        showToast('Error', 'Failed to schedule appointment. Please try again.', 'error');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initForm();
}); 