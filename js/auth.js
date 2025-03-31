// Authentication Module
class AuthManager {
    constructor() {
        this.user = null;
        this.userData = null;
        this.loading = true;
        this.error = null;
        this.listeners = new Set();
    }

    // Subscribe to auth state changes
    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    // Notify all listeners of auth state changes
    notifyListeners() {
        this.listeners.forEach(callback => callback({
            user: this.user,
            userData: this.userData,
            loading: this.loading,
            error: this.error
        }));
    }

    // Initialize auth state listener
    async init() {
        try {
            this.loading = true;
            this.error = null;

            // Set up auth state listener
            this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
                this.user = user;
                this.loading = false;

                if (user) {
                    try {
                        const userDoc = await firebase.firestore()
                            .collection('users')
                            .doc(user.uid)
                            .get();

                        if (userDoc.exists()) {
                            this.userData = userDoc.data();
                        }
                    } catch (err) {
                        console.error('Error fetching user data:', err);
                    }
                } else {
                    this.userData = null;
                }

                this.notifyListeners();
            });
        } catch (err) {
            console.error('Error initializing auth:', err);
            this.error = 'Failed to initialize authentication';
            this.loading = false;
        }
    }

    // Sign up new user
    async signUp(email, password, userData) {
        try {
            this.error = null;
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

            if (userData.displayName) {
                await user.updateProfile({ displayName: userData.displayName });
            }

            // Create user document in Firestore
            await firebase.firestore().collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                displayName: userData.displayName || null,
                role: userData.role || 'donor',
                phoneNumber: userData.phoneNumber || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                ...userData
            });
        } catch (err) {
            this.error = err.message;
            throw err;
        }
    }

    // Sign in user
    async signIn(email, password) {
        try {
            this.error = null;
            await firebase.auth().signInWithEmailAndPassword(email, password);

            if (this.user) {
                // Update last login time
                await firebase.firestore()
                    .collection('users')
                    .doc(this.user.uid)
                    .update({
                        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                    });
            }
        } catch (err) {
            this.error = err.message;
            throw err;
        }
    }

    // Sign out user
    async signOut() {
        try {
            this.error = null;
            await firebase.auth().signOut();
        } catch (err) {
            this.error = err.message;
            throw err;
        }
    }

    // Reset password
    async resetPassword(email) {
        try {
            this.error = null;
            await firebase.auth().sendPasswordResetEmail(email);
        } catch (err) {
            this.error = err.message;
            throw err;
        }
    }

    // Get current user
    getCurrentUser() {
        return {
            user: this.user,
            userData: this.userData,
            loading: this.loading,
            error: this.error
        };
    }

    // Cleanup function to unsubscribe from auth listener
    cleanup() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

// Create and export a single instance
const authManager = new AuthManager();
export default authManager; 