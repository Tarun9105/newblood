// Mobile Detection Module
class MobileDetector {
    constructor(breakpoint = 768) {
        this.breakpoint = breakpoint;
        this.isMobile = undefined;
        this.listeners = new Set();
        this.mql = window.matchMedia(`(max-width: ${this.breakpoint - 1}px)`);
    }

    // Subscribe to mobile state changes
    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    // Notify all listeners of mobile state changes
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.isMobile));
    }

    // Check if current viewport is mobile
    checkMobile() {
        const newIsMobile = window.innerWidth < this.breakpoint;
        if (this.isMobile !== newIsMobile) {
            this.isMobile = newIsMobile;
            this.notifyListeners();
        }
    }

    // Initialize mobile detection
    init() {
        // Initial check
        this.checkMobile();

        // Add event listener for window resize
        this.handleResize = () => this.checkMobile();
        window.addEventListener('resize', this.handleResize);

        // Add media query listener
        this.handleMediaQuery = (e) => {
            this.isMobile = e.matches;
            this.notifyListeners();
        };
        this.mql.addEventListener('change', this.handleMediaQuery);

        // Return cleanup function
        return () => {
            window.removeEventListener('resize', this.handleResize);
            this.mql.removeEventListener('change', this.handleMediaQuery);
        };
    }

    // Get current mobile state
    getIsMobile() {
        return this.isMobile;
    }
}

// Create and export a single instance
const mobileDetector = new MobileDetector();
export default mobileDetector; 