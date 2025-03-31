// Firebase configuration
const firebaseConfig = {
    // Replace these values with your Firebase project credentials
    // You can find these in your Firebase Console -> Project Settings -> General -> Your apps -> Web app
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = firebase.firestore(app);

// Export Firebase instances
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;

// Export configuration for other modules
window.firebaseConfig = firebaseConfig; 