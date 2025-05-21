document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupLink = document.getElementById('signupLink');
    
    // Check if user is already logged in
    if (localStorage.getItem('netflixAuth') && window.location.pathname.includes('index.html')) {
        window.location.href = 'browse.html';
    }

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Simple validation
        if (!email || !password) {
            showError('Please enter both email and password');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Simulate authentication (in real app, you'd call an API)
        authenticateUser(email, password, rememberMe);
    });
    
    // Sign up link
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Sign up page would open here');
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(message) {
        const errorElement = document.getElementById('error-message') || createErrorElement();
        errorElement.textContent = message;
    }
    
    function createErrorElement() {
        const errorElement = document.createElement('div');
        errorElement.id = 'error-message';
        errorElement.className = 'error-message';
        loginForm.insertBefore(errorElement, loginForm.firstChild);
        return errorElement;
    }
    
    function authenticateUser(email, password, rememberMe) {
        // Simulate API call with timeout
        setTimeout(() => {
            // In a real app, you would verify credentials with your backend
            if (password.length >= 6) { // Simple password length check
                // Store authentication state
                localStorage.setItem('netflixAuth', 'true');
                localStorage.setItem('netflixUserEmail', email);
                
                if (rememberMe) {
                    // Set longer expiration (7 days)
                    const expiration = new Date();
                    expiration.setDate(expiration.getDate() + 7);
                    document.cookie = `netflixAuth=true; expires=${expiration.toUTCString()}; path=/`;
                }
                
                // Redirect to browse page
                window.location.href = 'browse.html';
            } else {
                showError('Invalid credentials. Please try again.');
            }
        }, 500); // Simulate network delay
    }
});