// Stats Animation
function animateStats() {
    const stats = {
        registeredDonors: 5000,
        successfulDonations: 15000,
        livesSaved: 45000,
        partnerHospitals: 50
    };

    const elements = {
        registeredDonors: document.getElementById('registeredDonors'),
        successfulDonations: document.getElementById('successfulDonations'),
        livesSaved: document.getElementById('livesSaved'),
        partnerHospitals: document.getElementById('partnerHospitals')
    };

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Object.entries(stats).forEach(([key, value]) => {
                    animateValue(elements[key], 0, value, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe the stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Stats Module
class StatsManager {
    constructor() {
        this.stats = {
            registeredDonors: 0,
            successfulDonations: 0,
            livesSaved: 0,
            partnerHospitals: 0
        };
        this.isLoading = true;
        this.error = null;
        this.listeners = new Set();
    }

    // Subscribe to stats updates
    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    // Notify all listeners of stats changes
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.stats));
    }

    // Update stats
    updateStats(newStats) {
        this.stats = { ...this.stats, ...newStats };
        this.notifyListeners();
    }

    // Initialize real-time listeners
    async init() {
        try {
            this.isLoading = true;
            this.error = null;

            // Set up real-time listeners for each collection
            const donorsQuery = firebase.firestore()
                .collection('users')
                .where('role', '==', 'donor');

            const donationsQuery = firebase.firestore()
                .collection('donations')
                .where('status', '==', 'completed');

            const hospitalsQuery = firebase.firestore()
                .collection('hospitals');

            // Listen for donors changes
            this.donorsUnsubscribe = donorsQuery.onSnapshot(
                (snapshot) => {
                    this.updateStats({
                        registeredDonors: snapshot.size
                    });
                },
                (err) => {
                    console.error('Error listening to donors:', err);
                    this.error = 'Failed to fetch donors data';
                }
            );

            // Listen for donations changes
            this.donationsUnsubscribe = donationsQuery.onSnapshot(
                (snapshot) => {
                    this.updateStats({
                        successfulDonations: snapshot.size,
                        livesSaved: snapshot.size * 3 // Assuming each donation can save up to 3 lives
                    });
                },
                (err) => {
                    console.error('Error listening to donations:', err);
                    this.error = 'Failed to fetch donations data';
                }
            );

            // Listen for hospitals changes
            this.hospitalsUnsubscribe = hospitalsQuery.onSnapshot(
                (snapshot) => {
                    this.updateStats({
                        partnerHospitals: snapshot.size
                    });
                },
                (err) => {
                    console.error('Error listening to hospitals:', err);
                    this.error = 'Failed to fetch hospitals data';
                }
            );

            // Set loading to false after initial data is received
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);

        } catch (err) {
            console.error('Error initializing stats:', err);
            this.error = 'Failed to initialize stats';
            this.isLoading = false;
        }
    }

    // Cleanup function to unsubscribe from all listeners
    cleanup() {
        if (this.donorsUnsubscribe) this.donorsUnsubscribe();
        if (this.donationsUnsubscribe) this.donationsUnsubscribe();
        if (this.hospitalsUnsubscribe) this.hospitalsUnsubscribe();
    }
}

// Create and export a single instance
const statsManager = new StatsManager();
export default statsManager;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    initMobileNav();
    initScrollAnimations();
    setCurrentYear();
}); 