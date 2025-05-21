document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!localStorage.getItem('netflixAuth')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get movie ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    // Load movie data (in a real app, you'd fetch from an API)
    loadMovieData(movieId);
    
    // Sign out functionality
    document.getElementById('signOut').addEventListener('click', function() {
        localStorage.removeItem('netflixAuth');
        window.location.href = 'index.html';
    });
    
    // In browse.js and movie.js
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('active');
});
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!localStorage.getItem('netflixAuth')) {
        window.location.href = 'index.html';
        return;
    }

    // Sign out functionality
    document.getElementById('signOut')?.addEventListener('click', function() {
        localStorage.removeItem('netflixAuth');
        window.location.href = 'index.html';
    });

    // Episode interaction handlers
    const episodes = document.querySelectorAll('.episode');
    
    episodes.forEach(episode => {
        const playBtn = episode.querySelector('.btn-play-episode');
        const episodeNumber = episode.getAttribute('data-episode');
        
        // Click handler for entire episode card
        episode.addEventListener('click', function(e) {
            // Don't trigger if clicking on play button (it has its own handler)
            if (!playBtn.contains(e.target)) {
                playEpisode(episodeNumber);
            }
        });
        
        // Play button click handler
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            playEpisode(episodeNumber);
        });
        
        // Keyboard navigation
        episode.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playEpisode(episodeNumber);
            }
        });
    });

    function playEpisode(episodeNumber) {
        // In a real app, this would redirect to the player
        console.log(`Playing episode ${episodeNumber}`);
        alert(`Now playing: Episode ${episodeNumber}`);
        
        // Example of what you might do:
        // window.location.href = `/watch.html?show=witcher&season=2&episode=${episodeNumber}`;
    }

    // Load movie data (simulated)
    loadMovieData();
});

function loadMovieData() {
    // Simulated data loading
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    console.log(`Loading data for movie ID: ${movieId}`);
    // In a real app, you would fetch this from an API
}
    function loadMovieData(movieId) {
        // Simulated data - in a real app, you'd fetch this from an API
        const movieData = {
            id: movieId,
            title: 'The Witcher',
            backdrop: 'images/movie-bg.jpg',
            match: '95% Match',
            year: '2021',
            age: '18+',
            seasons: '2 Seasons',
            quality: 'HD',
            description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
            starring: 'Henry Cavill, Anya Chalotra, Freya Allan',
            creators: 'Lauren Schmidt Hissrich',
            episodes: Array(8).fill().map((_, i) => ({
                id: i + 1,
                title: `${i + 1}. ${['A Grain of Truth', 'Kaer Morhen', 'What Is Lost', 'Redanian Intelligence', 'Turn Your Back', 'Dear Friend', 'Voleth Meir', 'Family'][i]}`,
                description: 'Episode description would go here. This is a placeholder for the actual episode description.',
                image: `images/ep${(i % 3) + 1}.jpg`
            }))
        };
        
        // Update page with movie data
        document.title = `${movieData.title} | Netflix Clone`;
        document.querySelector('.hero-backdrop').style.backgroundImage = `url('${movieData.backdrop}')`;
        document.querySelector('.hero-content h1').textContent = movieData.title;
        
        const meta = document.querySelector('.movie-meta');
        meta.innerHTML = `
            <span class="match">${movieData.match}</span>
            <span class="year">${movieData.year}</span>
            <span class="age">${movieData.age}</span>
            <span class="seasons">${movieData.seasons}</span>
            <span class="quality">${movieData.quality}</span>
        `;
        
        document.querySelector('.movie-description').textContent = movieData.description;
        document.querySelector('.movie-details').innerHTML = `
            <p><strong>Starring:</strong> ${movieData.starring}</p>
            <p><strong>Creators:</strong> ${movieData.creators}</p>
        `;
        
        // Render episodes
        const episodesContainer = document.querySelector('.episodes-container');
        episodesContainer.innerHTML = movieData.episodes.map(episode => `
            <div class="episode">
                <div class="episode-image">
                    <img src="${episode.image}" alt="${episode.title}">
                    <button class="btn-play-episode">▶</button>
                </div>
                <div class="episode-info">
                    <h3>${episode.title}</h3>
                    <p>${episode.description}</p>
                </div>
            </div>
        `).join('');
    }
});