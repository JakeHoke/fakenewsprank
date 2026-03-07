/**
 * Auth Guard - Protects Create links
 * If signed in → navigate to create. If not → Google sign-in popup, then navigate.
 */

(function() {
    'use strict';

    const CREATE_LINK_SELECTOR = '[data-create-link]';

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

    function goToCreate(url) {
        window.location.href = url;
    }

    function handleCreateClick(e) {
        const link = e.currentTarget;
        const createUrl = link.getAttribute('href') || link.dataset.createHref || '/create';

        e.preventDefault();

        if (auth.currentUser) {
            goToCreate(createUrl);
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(() => goToCreate(createUrl))
            .catch((err) => {
                console.error('[Auth] Sign-in failed:', err);
            });
    }

    document.querySelectorAll(CREATE_LINK_SELECTOR).forEach((el) => {
        el.addEventListener('click', handleCreateClick);
    });
})();
