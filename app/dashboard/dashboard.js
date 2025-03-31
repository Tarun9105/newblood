// Mock user data (replace with actual authentication)
const mockUserData = {
    displayName: 'John Doe',
    email: 'john@example.com',
    bloodType: 'A+',
    phoneNumber: '+1 234 567 890',
    role: 'donor'
};

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const userDropdownBtn = document.getElementById('userDropdownBtn');
const userDropdownMenu = document.getElementById('userDropdownMenu');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userBloodType = document.getElementById('userBloodType');
const welcomeName = document.getElementById('welcomeName');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profilePhone = document.getElementById('profilePhone');
const profileBloodType = document.getElementById('profileBloodType');
const logoutBtn = document.getElementById('logoutBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const actionButton = document.getElementById('actionButton');

// Initialize user data
function initUserData() {
    // In a real application, this would come from your authentication system
    const userData = mockUserData;

    // Update user information
    userName.textContent = userData.displayName;
    userEmail.textContent = userData.email;
    userBloodType.textContent = userData.bloodType;
    welcomeName.textContent = userData.displayName;
    profileName.value = userData.displayName;
    profileEmail.value = userData.email;
    profilePhone.value = userData.phoneNumber;
    profileBloodType.value = userData.bloodType;

    // Update action button based on user role
    if (userData.role === 'donor') {
        actionButton.innerHTML = '<i class="fas fa-plus"></i><span>Schedule Donation</span>';
        actionButton.onclick = () => window.location.href = 'appointments/schedule.html';
    } else {
        actionButton.innerHTML = '<i class="fas fa-plus"></i><span>Request Blood</span>';
        actionButton.onclick = () => window.location.href = 'requests/new.html';
    }
}

// Initialize tabs
function initTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize user dropdown
function initUserDropdown() {
    userDropdownBtn.addEventListener('click', () => {
        userDropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userDropdownBtn.contains(e.target) && !userDropdownMenu.contains(e.target)) {
            userDropdownMenu.classList.remove('active');
        }
    });
}

// Handle logout
function handleLogout() {
    logoutBtn.addEventListener('click', async () => {
        try {
            // Show loading overlay
            loadingOverlay.style.display = 'flex';

            // In a real application, this would call your authentication service
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Redirect to home page
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle error (show toast notification, etc.)
        } finally {
            loadingOverlay.style.display = 'none';
        }
    });
}

// Initialize notifications
function initNotifications() {
    const notificationsBtn = document.getElementById('notificationsBtn');
    notificationsBtn.addEventListener('click', () => {
        // Implement notifications functionality
        console.log('Notifications clicked');
    });
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initUserData();
    initTabs();
    initUserDropdown();
    handleLogout();
    initNotifications();
    setCurrentYear();
}); 