document.addEventListener('DOMContentLoaded', function() {
    // Go back button
    document.getElementById('goback').addEventListener('click', () => {
        window.location.href = 'popup.html';
    });

    // Share button
    document.getElementById('shareList').addEventListener('click', shareAnimeList);

    // Load anime list
    loadAnimeList();
});

function shareAnimeList() {
    chrome.storage.sync.get(['animeList'], function(result) {
        const animeList = result.animeList || [];
        
        if (animeList.length === 0) {
            alert('Your anime list is empty. Add some animes to share!');
            return;
        }
        
        // Create a shareable text
        let shareText = "My Anime List:\n\n";
        animeList.forEach((anime, index) => {
            shareText += `${index + 1}. ${anime.title} (${anime.year}) - Rating: ${anime.rating}/10\n`;
            shareText += `   Type: ${anime.anime_type}, Episodes: ${anime.episodes}\n`;
            shareText += `   Genres: ${anime.genres.slice(0, 5).join(', ')}${anime.genres.length > 5 ? '...' : ''}\n\n`;
        });
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Anime list copied to clipboard! You can now paste it anywhere.');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback if clipboard API fails
            const textarea = document.createElement('textarea');
            textarea.value = shareText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Anime list copied to clipboard! You can now paste it anywhere.');
        });
    });
}

function loadAnimeList() {
    chrome.storage.sync.get(['animeList'], function(result) {
        const animeList = result.animeList || [];
        const container = document.getElementById('anime-list-container');
        
        if (animeList.length === 0) {
            container.style.marginLeft = "3.3rem";
            container.innerHTML = '<p>Your anime list is empty. Add some animes to your list!</p>';
            return;
        }
        
        container.innerHTML = '';
        
        animeList.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.className = 'anime-card';
            animeCard.style.width= "90%";
            animeCard.style.marginLeft= "0.5rem";
            animeCard.innerHTML = `
                <div class="anime-content">
                    <div class="anime-header">
                        <h3 class="anime-title">${escapeHTML(anime.title)} (${anime.year})</h3>
                    </div>
                    
                    <div class="anime-meta">
                        <span class="anime-meta-item">&starf; ${anime.rating}/10</span>
                        <span class="anime-meta-item">${escapeHTML(anime.anime_type)}</span>
                        <span class="anime-meta-item">${anime.episodes} eps</span>
                    </div>
                    
                    <div class="anime-genres">
                        ${anime.genres.slice(0, 5).map(genre =>
                        `<span class="genre-tag">${escapeHTML(genre)}</span>`
                         ).join('')}
                        ${anime.genres.length > 5 ? '<span class="genre-tag">+ more</span>' : ''}
                    </div>
                    
                    <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 5px; margin-top: 10px;">
                        <button class="remove-btn" data-title="${escapeHTML(anime.title)}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/>
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                            Remove
                        </button>
                        
                        <button class="details-btn" data-anime='${JSON.stringify(anime).replace(/"/g, '&quot;').replace(/'/g, '&apos;')}'>
                            More Details
                        </button>
                    </div>
                </div>
                
                <img class="anime-poster" src="${escapeHTML(anime.poster)}" alt="${escapeHTML(anime.title)} poster">
            `;
            
            container.appendChild(animeCard);
        });
        
        // Add event listeners
        container.addEventListener('click', (e) => {
            if (e.target.closest('.remove-btn')) {
                const title = e.target.closest('.remove-btn').getAttribute('data-title');
                removeFromAnimeList(title);
            }
            
            if (e.target.closest('.details-btn')) {
                const btn = e.target.closest('.details-btn');
                const animeDataStr = btn.getAttribute('data-anime');
                
                try {
                    const animeData = JSON.parse(animeDataStr);
                    localStorage.setItem('currentAnime', JSON.stringify(animeData));
                    window.location.href = 'aboutAnime.html';
                } catch (error) {
                    console.error('Error parsing anime data:', error);
                    alert('Error loading anime details. Please try again.');
                }
            }
        });
    });
}

function removeFromAnimeList(title) {
    chrome.storage.sync.get(['animeList'], function(result) {
        const animeList = result.animeList || [];
        const updatedList = animeList.filter(anime => anime.title !== title);
        
        chrome.storage.sync.set({ animeList: updatedList }, function() {
            loadAnimeList();
        });
    });
}

function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

