// Process steps data
const steps = [
    {
        icon: 'user',
        title: 'Register',
        description: 'Create your account and complete your profile with your blood type and contact information.'
    },
    {
        icon: 'calendar',
        title: 'Schedule Appointment',
        description: 'Choose a convenient time and location for your donation.'
    },
    {
        icon: 'shield',
        title: 'Health Check',
        description: 'Complete a quick health screening to ensure you\'re eligible to donate.'
    },
    {
        icon: 'tint',
        title: 'Donate Blood',
        description: 'The donation process takes about 8-10 minutes. You\'ll be monitored throughout.'
    },
    {
        icon: 'clock',
        title: 'Recovery',
        description: 'Rest for 15 minutes after donation and enjoy refreshments provided.'
    },
    {
        icon: 'heart',
        title: 'Save Lives',
        description: 'Your donation can save up to three lives. Track your impact in your dashboard.'
    }
];

// DOM Elements
const stepsGrid = document.getElementById('stepsGrid');

// Render process steps
function renderSteps() {
    stepsGrid.innerHTML = steps.map(step => `
        <div class="step-card">
            <div class="step-header">
                <div class="step-icon">
                    <i class="fas fa-${step.icon}"></i>
                </div>
                <h3 class="step-title">${step.title}</h3>
            </div>
            <p class="step-description">${step.description}</p>
        </div>
    `).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderSteps();
}); 