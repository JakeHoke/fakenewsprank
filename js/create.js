/**
 * Create Page — Firebase user initialization
 * Waits for auth state, redirects if unauthenticated, exposes currentUser.
 */

(function() {
    'use strict';

    const firebaseConfig = {
        apiKey: "AIzaSyA_d3KDsA4Ib-qIDsYdpOVANM2z2pn9LeM",
        authDomain: "fakenewsprank-44553.firebaseapp.com",
        projectId: "fakenewsprank-44553",
        storageBucket: "fakenewsprank-44553.firebasestorage.app",
        messagingSenderId: "197846073131",
        appId: "1:197846073131:web:9ac698001faab45a42cf6e",
        measurementId: "G-J5RQCTR5JS"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    window.currentUser = null;

    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = '/';
            return;
        }

        window.currentUser = {
            uid: user.uid,
            email: user.email
        };

        console.log('currentUser:', window.currentUser);

        document.querySelector('main p').textContent = 'Signed in as ' + user.email;
    });
})();
