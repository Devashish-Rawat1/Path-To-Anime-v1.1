# Path-To-Anime

**A Chrome Extension for Anime Discovery, Recommendations, and Watchlist Management**

Version 1.2 | Chrome Manifest V3 | Available on the Chrome Web Store

[Install on Chrome Web Store](https://chromewebstore.google.com/detail/path-to-anime/hmkdpjckcgcmhbdpiimkaddjhhfcgbpg?hl=en-US&utm_source=ext_sidebar)

---

## Overview

Path-To-Anime is a browser extension built for anime enthusiasts at every level — whether you are just starting out or have been watching for years. The extension gives you instant access to a curated database of over 200 popular anime titles, a multi-criteria recommendation engine, a personal watchlist you can share with friends, and direct streaming platform links — all without leaving your browser.

No accounts, no API rate limits, no external dependencies. Everything runs locally using a hand-crafted dataset.

---

## Features

### Custom-Built Dataset — 200+ Popular Anime

The core of Path-To-Anime is a manually curated dataset of over 200 popular anime titles, stored entirely in `dataset.js`. Each entry includes the title, genres, episode count, average rating, synopsis, cover poster, and streaming platform availability. This dataset was researched and assembled by hand, ensuring accuracy and quality across both mainstream hits and underrated picks.

### Recommendation Filtering System

The recommendation engine lets users apply multiple filters simultaneously to narrow down their next watch. Filters include genre (action, romance, thriller, slice of life, and more), episode count range, minimum rating threshold, and airing status. The engine cross-references these inputs against the full dataset and returns a ranked list of matching anime. Users can access this through the Recommend page (`recommend.html`) and view their results on the dedicated results page (`recommended_animes.html`).

### My Anime List — Build and Share Your Watchlist

Users can add any anime to a personal list directly from the details page. The list is persisted using Chrome's built-in `storage` permission, so it survives browser restarts without needing any external server or account. The Anime List page (`animeList.html`) displays your saved titles and provides a shareable link or export so you can send your watchlist to friends.

### Anime Details and Streaming Links

Clicking on any anime opens the details page (`aboutAnime.html`), which displays the full synopsis, genre tags, episode count, rating, and a poster image. Below the details, the page lists all known streaming platforms where that title is available — such as Crunchyroll, Netflix, HiDive, and others — with direct links to each platform.

### Smart Search

The search page (`search.html`) lets users look up any anime in the dataset by name. Results appear in real time as you type, and each result card shows the title, rating, and genre tags at a glance.

### Installable as a PWA

The extension includes a `manifest.json` configured for Chrome Manifest V3, with icon assets at 16px, 48px, and 128px. The popup entry point (`popup.html`) opens the extension interface directly from the Chrome toolbar.

---

## File Structure

```
Path-To-Anime-v1.1/
|
|-- anime_posters/              # Poster images for all 200+ anime titles in the dataset
|
|-- icons/                      # Extension icons at three sizes
|   |-- icon16.png
|   |-- icon48.png
|   `-- icon128.png
|
|-- scripts/                    # JavaScript logic files
|   |-- (recommendation engine, search logic, list management, etc.)
|
|-- styles/                     # CSS stylesheets for all pages
|
|-- dataset.js                  # Hand-curated dataset of 200+ anime with full metadata
|-- manifest.json               # Chrome Manifest V3 configuration
|-- popup.html                  # Extension popup entry point (toolbar click)
|-- search.html                 # Live search page
|-- recommend.html              # Filter input page for recommendations
|-- recommended_animes.html     # Results page for filtered recommendations
|-- aboutAnime.html             # Detailed anime info page with streaming links
|-- animeList.html              # Personal watchlist page with share functionality
|-- home_image.jpg              # Homepage hero image
|-- .gitignore
`-- README.md
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Data | Custom hand-built JavaScript dataset (`dataset.js`) |
| Storage | Chrome Storage API (local persistence, no server required) |
| Extension Platform | Chrome Manifest V3 |
| Assets | Local poster images, PNG icons |

---

## Installation

**From the Chrome Web Store (Recommended)**

1. Visit the [Path-To-Anime Chrome Web Store page](https://chromewebstore.google.com/detail/path-to-anime/hmkdpjckcgcmhbdpiimkaddjhhfcgbpg?hl=en-US&utm_source=ext_sidebar).
2. Click "Add to Chrome".
3. Confirm the permissions prompt.
4. Click the extension icon in your Chrome toolbar to open the popup.

**From Source (Developer Mode)**

1. Clone or download this repository.
   ```
   git clone https://github.com/Devashish-Rawat1/Path-To-Anime-v1.1.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle in the top-right corner.
4. Click "Load unpacked" and select the cloned repository folder.
5. The extension will appear in your toolbar immediately.

---

## Usage

1. Click the Path-To-Anime icon in your Chrome toolbar to open the popup.
2. Use the Search tab to find any anime by name.
3. Use the Recommend tab to apply genre, rating, and episode filters and get a personalized list.
4. Click any anime card to open the full details page, where you can read the synopsis, see tags, and find streaming platform links.
5. Add anime to your personal list from the details page.
6. Open the Anime List page to view your saved titles and share the list with friends.

---

## Dataset

The dataset powering this extension was created from scratch. It covers over 200 of the most popular and well-regarded anime titles spanning multiple genres and eras. Each record contains the following fields:

- Title
- Genre tags (one or more)
- Episode count
- Average community rating
- Synopsis
- Airing status
- Streaming platforms (with availability flags)
- Poster image reference

The dataset does not rely on any third-party API. All data was manually researched and formatted, making the extension fully functional offline.

---

## Permissions

The extension requests only one permission:

- `storage` — Used to save and retrieve your personal anime list across browser sessions. No data is transmitted externally.

---

## Contributing

Contributions are welcome. If you want to add anime titles to the dataset, fix a bug, or improve the UI, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes with a clear message.
4. Open a pull request describing what you changed and why.

---

## License

This project is open source. See the repository for license details.

---

## Acknowledgements

Built and maintained by [Devashish Rawat](https://github.com/Devashish-Rawat1). If you find the extension useful, consider leaving a star on GitHub or a review on the Chrome Web Store — it helps others discover the project.
