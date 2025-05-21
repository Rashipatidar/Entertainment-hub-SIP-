document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Initialize page
    initBrowsePage();
    
    // Set up event listeners
    setupEventListeners();
});

function checkAuth() {
    const isAuthenticated = localStorage.getItem('netflixAuth') || 
                          document.cookie.includes('netflixAuth=true');
    
    if (!isAuthenticated) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display user email if available
    const userEmail = localStorage.getItem('netflixUserEmail');
    if (userEmail) {
        const profileButton = document.querySelector('.profile-button');
        if (profileButton) {
            profileButton.setAttribute('aria-label', `Account menu for ${userEmail}`);
        }
    }
}

function initBrowsePage() {
    // Load user-specific content
    loadUserContent();
    
    // Set up header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function setupEventListeners() {
    // Sign out functionality
    document.getElementById('signOut')?.addEventListener('click', function() {
        signOut();
    });
    
    // Content item interactions
    document.querySelectorAll('.content-item').forEach(item => {
        item.addEventListener('click', function() {
            const movieId = this.getAttribute('data-id');
            window.location.href = `movie.html?id=${movieId}`;
        });
    });
}

function loadUserContent() {
    // In a real app, you would fetch user-specific content from an API
    console.log('Loading personalized content...');
    // Simulated content loading would go here
}

function signOut() {
    // Clear authentication data
    localStorage.removeItem('netflixAuth');
    localStorage.removeItem('netflixUserEmail');
    
    // Clear cookie
    document.cookie = 'netflixAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Redirect to login page
    window.location.href = 'index.html';
}