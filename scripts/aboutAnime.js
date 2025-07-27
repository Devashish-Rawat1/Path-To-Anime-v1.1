document.addEventListener('DOMContentLoaded', function() {
    // Get back button
    document.getElementById('goBack').addEventListener('click', () => {
        window.history.back();
    });

    // Get anime data from localStorage
    const animeData = JSON.parse(localStorage.getItem('currentAnime'));
    const detailsDiv = document.getElementById('anime-details');

    if (animeData) {
        detailsDiv.innerHTML = `
            <div class="anime-card" style="flex-direction: column;">
                <div style="display: flex; gap: 15px;">
                    <img class="anime-poster" src="${animeData.poster}" alt="${animeData.title} poster" style="width: 200px;">
                    <div>
                        <h1 class="anime-title">${animeData.title} (${animeData.year})</h1>
                        <div class="anime-meta">
                            <span class="anime-meta-item">&starf; ${animeData.rating}/10</span>
                            <span class="anime-meta-item">${animeData.anime_type}</span>
                            <span class="anime-meta-item">${animeData.episodes} episodes</span>
                            <span class="anime-meta-item">${animeData.status}</span>
                        </div>
                        <p><strong>Popularity:</strong> ${animeData.popularity.toLocaleString()}</p>
                        
                    </div>
                </div>
                <p><strong>Aired:</strong> ${animeData.aired.join('  to  ')}</p>
                <div class="anime-genres">
                    ${animeData.genres.map(genre => 
                        `<span class="genre-tag">${genre}</span>`
                    ).join('')}
                </div>
                
                <div>
                    <h3 style="margin-top:2px;">Synopsis</h3>
                    <p class="anime-synopsis">${animeData.synopsis}</p>
                </div>
                
                <div>
                    <h3 style="margin-top:2px; margin-bottom:8px;">Available On</h3>
                    ${Object.entries(animeData.available_on).map(([platform, url]) => `
                        <a style="margin-bottom:9px; margin-right: 15px; cursor: pointer;" class="streaming-link" data-url="${url}">${platform}</a>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listener for streaming links
        detailsDiv.addEventListener('click', (e) => {
            if (e.target.closest('.streaming-link')) {
                e.preventDefault();
                const url = e.target.getAttribute('data-url');
                openInCurrentTab(url);
            }
        });
    } else {
        detailsDiv.innerHTML = '<p>No anime data found. Please go back and try again.</p>';
    }
});

// Function to open URL in current tab
function openInCurrentTab(url) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: url});
    });
}