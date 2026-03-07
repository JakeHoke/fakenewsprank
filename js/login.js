/**
 * Firebase Auth - Login
 *
 * Config + auth logic. Firebase config: Firebase Console → Project Settings → Your apps
 * Enable Email/Password: Authentication → Sign-in method
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

const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const authMessage = document.getElementById('auth-message');
const signupMessage = document.getElementById('signup-message');

const tabs = document.querySelectorAll('.tab');

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

function clearAuthMessages() {
    authMessage.textContent = '';
    authMessage.className = 'message';
    signupMessage.textContent = '';
    signupMessage.className = 'message';
}

// -----------------------------------------------------------------------------
// Tab Switching (Sign In / Sign Up)
// -----------------------------------------------------------------------------
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        log('Switching to tab:', targetTab);

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        clearAuthMessages();

        if (targetTab === 'signin') {
            signinForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            signinForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        }
    });
});

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
// Sign In
// -----------------------------------------------------------------------------
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAuthMessages();

    const email = signinEmail.value.trim();
    const password = signinPassword.value;

    log('Sign in attempt for:', email);

    try {
        await auth.signInWithEmailAndPassword(email, password);
        log('Sign in successful');
        signinForm.reset();
    } catch (error) {
        log('Sign in error:', error.code, error.message);
        authMessage.textContent = error.message || 'Sign in failed';
        authMessage.classList.add('error');
    }
});

// -----------------------------------------------------------------------------
// Sign Up
// -----------------------------------------------------------------------------
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAuthMessages();

    const email = signupEmail.value.trim();
    const password = signupPassword.value;

    log('Sign up attempt for:', email);

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        log('Sign up successful');
        signupForm.reset();
    } catch (error) {
        log('Sign up error:', error.code, error.message);
        signupMessage.textContent = error.message || 'Sign up failed';
        signupMessage.classList.add('error');
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
