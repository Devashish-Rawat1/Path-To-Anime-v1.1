document.getElementById('goback').addEventListener('click', () => {
  window.location.href = 'popup.html';
});

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('input');
  const searchBtn = document.getElementById('searchBtn');
  const resultsDiv = document.getElementById('results');

  // Search functionality
  searchBtn.addEventListener('click', function () {
    const query = searchInput.value.toLowerCase();
    if (!query) return;

    const results = animeData.filter(anime =>
      anime.title.toLowerCase().includes(query) ||
      anime.synopsis.toLowerCase().includes(query)
    );

    displayResults(results);
  });

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });

  // Display results
  function displayResults(animes) {
    resultsDiv.innerHTML = '';

    if (animes.length === 0) {
      resultsDiv.innerHTML = '<p>No results found.</p>';
      return;
    }

    animes.forEach(anime => {
      const card = document.createElement('div');
      card.className = 'anime-card';

      // Create a safe string for the data attribute
      const animeDataStr = JSON.stringify(anime)
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

      card.innerHTML = `
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
          
          <p class="anime-synopsis">${escapeHTML(anime.synopsis)}</p>

          <button class="add-to-list-btn" data-anime="${animeDataStr}">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
               <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/>
               <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
               </svg>
               Add to List
             </button>

          <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 5px; margin-top: 10px;">
            <strong>Watch here: </strong>
            ${Object.entries(anime.available_on).slice(0, 2).map(([platform, url]) => `
               <a href="${escapeHTML(url)}" class="streaming-link" data-url="${escapeHTML(url)}">${escapeHTML(platform)}</a>
            `).join(',')}
          </div>
          <div style="display: flex; align-items: center; flex-wrap: wrap;"> 
            <button class="share-btn" data-title="${escapeHTML(anime.title)}" data-poster="${escapeHTML(anime.poster)}" data-url="${escapeHTML(Object.values(anime.available_on)[0] || '#')}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
              </svg>
              Share
            </button>
            
            <button class="details-btn" data-anime="${animeDataStr}">
              More Details
            </button>
          </div>

        </div>
        
        <img class="anime-poster" src="${escapeHTML(anime.poster)}" alt="${escapeHTML(anime.title)} poster">
      `;

      resultsDiv.appendChild(card);
    });
  }

  // Helper function to escape HTML special characters
  function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Function to open URL in current tab
  function openInCurrentTab(url) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: url });
    });
  }

  // Handle clicks on results
  resultsDiv.addEventListener('click', (e) => {
    if (e.target.closest('.streaming-link')) {
      e.preventDefault();
      const url = e.target.getAttribute('data-url');
      openInCurrentTab(url);
    }

    if (e.target.closest('.share-btn')) {
      const btn = e.target.closest('.share-btn');
      const title = btn.getAttribute('data-title');
      const poster = btn.getAttribute('data-poster');
      const url = btn.getAttribute('data-url');

      shareAnime(title, poster, url);
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

    if (e.target.closest('.add-to-list-btn')) {
      const btn = e.target.closest('.add-to-list-btn');
      const animeDataStr = btn.getAttribute('data-anime');

      try {
        const animeData = JSON.parse(animeDataStr);
        addToAnimeList(animeData);
      } catch (error) {
        console.error('Error parsing anime data:', error);
        alert('Error adding anime to list. Please try again.');
      }
    }
  });

  // Share function
  function shareAnime(title, poster, url) {
    if (navigator.share) {
      navigator.share({
        title: `Check out this anime: ${title}`,
        text: `I found this anime and thought you might like it!`,
        url: url
      }).catch(err => {
        console.error('Error sharing:', err);
        fallbackShare(title, url);
      });
    } else {
      fallbackShare(title, url);
    }
  }

  // Fallback share method
  function fallbackShare(title, url) {
    const shareText = `Check out this anime: ${title}\nWatch it here: ${url}`;

    navigator.clipboard.writeText(shareText).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      prompt('Copy this link to share:', url);
    });
  }
});


// function addToAnimeList(anime) {
//   chrome.storage.sync.get(['animeList'], function(result) {
//     const animeList = result.animeList || [];
    
//     // Check if anime already exists in the list
//     const exists = animeList.some(item => item.title === anime.title);
    
//     if (!exists) {
//       animeList.push(anime);
//       chrome.storage.sync.set({ animeList }, function() {
//         alert(`${anime.title} added to your list!`);
//       });
//     } else {
//       alert(`${anime.title} is already in your list!`);
//     }
//   });
// }
let isAdding = false;

function addToAnimeList(anime) {
  if (isAdding) return; //  Skip if already running
  isAdding = true;

  chrome.storage.sync.get(['animeList'], (result) => {
    const animeList = result.animeList || [];
    const exists = animeList.some(item => item.title === anime.title);

    if (!exists) {
      animeList.push(anime);
      chrome.storage.sync.set({ animeList }, () => {
        isAdding = false;
        alert(`${anime.title} added!`); //  Only fires once
      });
    } else {
      isAdding = false;
      alert(`${anime.title} already exists!`);
    }
  });
}