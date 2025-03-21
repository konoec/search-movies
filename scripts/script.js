const api_key = "59566177bf9db4fbf3e70317977d1c60"
const urlBase = "https://api.themoviedb.org/3/search/movie"

document.getElementById("button-search")
    .addEventListener("click", search);

function search(){
    let searchTerm = document.getElementById("search").value;
    const url = `${urlBase}?api_key=${api_key}&query=${searchTerm}`

    fetch(url)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
        .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
    const moviesGrid = document.getElementById("movies-grid")
    moviesGrid.innerHTML = '';

    if (!movies || movies.length === 0){
        const noResults = document.createElement("div")
        noResults.classList.add("welcome-message")
        noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <h2>No Results Found</h2>
            <p>Try searching for a different movie</p>
        `
        moviesGrid.appendChild(noResults)
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement("div")
        movieElement.classList.add("movie-card")

        const moviePoster = document.createElement("div")
        moviePoster.classList.add("movie-poster")

        const movieInfo = document.createElement("div")
        movieInfo.classList.add("movie-info")

        const poster = document.createElement("img")
        poster.src = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image+Available'
        poster.alt = movie.title

        const title = document.createElement("h3")
        title.innerText = movie.title

        const overview = document.createElement("p")
        overview.classList.add("movie-description")
        overview.innerText = movie.overview || 'No description available'

        const button = document.createElement("button")
        button.classList.add("details-btn")
        button.innerText = "More Details"
        button.addEventListener('click', () => showMovieDetails(movie))

        moviePoster.appendChild(poster)
        movieInfo.appendChild(title)
        movieInfo.appendChild(overview)
        movieInfo.appendChild(button)
        movieElement.appendChild(moviePoster)
        movieElement.appendChild(movieInfo)
        moviesGrid.appendChild(movieElement)
    })
}

function showMovieDetails(movie) {
    const modal = document.getElementById("movie-modal");
    document.getElementById("modal-poster").src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image+Available';
    document.getElementById("modal-title").innerText = movie.title;
    document.getElementById("modal-release-date").innerText = `Release Date: ${movie.release_date || 'N/A'}`;
    document.getElementById("modal-rating").innerText = `Rating: ${movie.vote_average}/10`;
    document.getElementById("modal-overview").innerText = movie.overview || 'No description available';

    modal.style.display = "block";

    document.querySelector(".close").onclick = () => modal.style.display = "none";

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}