// Display results when page loads
document.addEventListener('DOMContentLoaded', function () {
    const filteredAnimes = JSON.parse(localStorage.getItem('filteredAnimes'));
    const sortBy = localStorage.getItem('sortBy');

    if (filteredAnimes && filteredAnimes.length > 0) {
        displayResults(filteredAnimes, sortBy);
    } else {
        document.getElementById('results').innerHTML = '<p>No animes match your criteria.</p>';
    }
});


document.getElementById('goback').addEventListener('click', () => {
    window.location.href = 'recommend.html';
});