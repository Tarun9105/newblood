// Theme Management
class ThemeManager {
    static init() {
        const savedTheme = localStorage.getItem('bloodconnect-theme') || 'light';
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = savedTheme === 'system' ? systemTheme : savedTheme;
        
        document.documentElement.setAttribute('data-theme', theme);
    }

    static toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('bloodconnect-theme', newTheme);
    }

    static initSystemThemeListener() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('bloodconnect-theme') === 'system') {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Toast Notifications
class Toast {
    static show(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Trigger reflow
        toast.offsetHeight;
        
        // Add show class for animation
        toast.classList.add('show');
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }

    static success(message) {
        this.show(message, 'success');
    }

    static error(message) {
        this.show(message, 'error');
    }

    static warning(message) {
        this.show(message, 'warning');
    }
}

// Mobile Menu
class MobileMenu {
    static init() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }
    }
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    ThemeManager.init();
    ThemeManager.initSystemThemeListener();

    // Initialize mobile menu
    MobileMenu.init();

    // Set current year in footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}); 