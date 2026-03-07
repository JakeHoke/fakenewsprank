/**
 * Firebase Auth - Login (Google Sign-In only)
 *
 * Config + auth logic. Firebase config: Firebase Console → Project Settings → Your apps
 * Enable Google: Authentication → Sign-in method → Google
 */

// -----------------------------------------------------------------------------
// Firebase Config
// -----------------------------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyA_d3KDsA4Ib-qIDsYdpOVANM2z2pn9LeM",
    authDomain: "fakenewsprank-44553.firebaseapp.com",
    projectId: "fakenewsprank-44553",
    storageBucket: "fakenewsprank-44553.firebasestorage.app",
    messagingSenderId: "197846073131",
    appId: "1:197846073131:web:9ac698001faab45a42cf6e",
    measurementId: "G-J5RQCTR5JS"
};

// -----------------------------------------------------------------------------
// App Config
// -----------------------------------------------------------------------------
const LOG_ENABLED = true;  // Set to false to disable debug logs

function log(...args) {
    if (LOG_ENABLED) {
        console.log('[Auth]', ...args);
    }
}

// -----------------------------------------------------------------------------
// Firebase Initialization
// -----------------------------------------------------------------------------
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

log('Firebase initialized');

// -----------------------------------------------------------------------------
// DOM Elements
// -----------------------------------------------------------------------------
const signedOutView = document.getElementById('signed-out-view');
const signedInView = document.getElementById('signed-in-view');
const userEmailEl = document.getElementById('user-email');
const signoutBtn = document.getElementById('signout-btn');
const googleSigninBtn = document.getElementById('google-signin-btn');
const authMessage = document.getElementById('auth-message');

// -----------------------------------------------------------------------------
// View Switching
// -----------------------------------------------------------------------------
function showSignedOutView() {
    log('Showing signed-out view');
    signedOutView.classList.remove('hidden');
    signedInView.classList.add('hidden');
}

function showSignedInView(user) {
    log('Showing signed-in view for:', user.email);
    signedInView.classList.remove('hidden');
    signedOutView.classList.add('hidden');
    userEmailEl.textContent = user.email;
}

function clearAuthMessage() {
    authMessage.textContent = '';
    authMessage.className = 'message';
}

// -----------------------------------------------------------------------------
// Auth State Listener
// -----------------------------------------------------------------------------
auth.onAuthStateChanged((user) => {
    if (user) {
        log('User signed in:', user.email);
        showSignedInView(user);
    } else {
        log('User signed out (or first visit)');
        showSignedOutView();
    }
});

// -----------------------------------------------------------------------------
// Google Sign In
// -----------------------------------------------------------------------------
googleSigninBtn.addEventListener('click', async () => {
    clearAuthMessage();
    log('Google sign in clicked');

    const provider = new firebase.auth.GoogleAuthProvider();

    try {
        await auth.signInWithPopup(provider);
        log('Google sign in successful');
    } catch (error) {
        log('Google sign in error:', error.code, error.message);
        authMessage.textContent = error.message || 'Sign in failed';
        authMessage.classList.add('error');
    }
});

// -----------------------------------------------------------------------------
// Sign Out
// -----------------------------------------------------------------------------
signoutBtn.addEventListener('click', async () => {
    log('Sign out clicked');
    try {
        await auth.signOut();
        log('Sign out successful');
    } catch (error) {
        log('Sign out error:', error);
    }
});
