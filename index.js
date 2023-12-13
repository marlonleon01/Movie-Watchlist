const searchInput = document.getElementById("movie-name-input")
const searchBtn = document.getElementById("search-btn")
const movieContainer = document.getElementById("movie-container")
const placeholderPost = `./image/NoPosterAvailable.jpg`
const watchlistBtn = document.getElementsByClassName("add-to-watchlist-container")

let movies = []
let watchlist = []

function searchMovie() {
    removeMovieContainerElems()
    movies = []
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=28131219`)
        .then(res => res.json())
        .then(data => {
            for (let movie of data.Search) {
                fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=28131219`)
                    .then(res => res.json())
                    .then(data => {
                        displayMovie(data)
                        watchlistListener(data)
                    })
            }
        })
}

searchBtn.addEventListener("click", searchMovie)

function displayMovie(movie) {
    movies.push(movie)

    if (movie.Poster === "N/A") {
        movie.Poster = placeholderPost
    }

    movieContainer.innerHTML += `
        <div class="movie" id="${movie.imdbID}">
                <img src="${movie.Poster}" class="movie-poster">
            <div>
                <div class="movie-title-container">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <i class="fa-solid fa-star star-icon"></i>
                    <p class="movie-rating">${movie.imdbRating}</p>
                </div>
                <div class="movie-middle-section">
                    <div class="movie-runtime-container">
                        <p class="movie-runtime">${movie.Runtime}</p>
                        <p class="movie-genre">${movie.Genre}</p>
                    </div>
                    <div class="add-to-watchlist-container">
                        <i class="fa-solid fa-plus plus-icon"></i>
                        <p class="add-to-watchlist-text">Watchlist</p>
                    </div>
                </div>
                <p class="movie-description">${movie.Plot}</p>
            </div>
        </div>
    `
}


function removeMovieContainerElems() {
    movieContainer.innerHTML = ""
}

function watchlistListener(movie) {
    for(let i = 0; i < watchlistBtn.length; ++i) {
        watchlistBtn[i].addEventListener("click", () => {
            addToWatchlist(movies[i]);
        });
    }
}

function addToWatchlist(movie) {
    watchlist.push(movie)
    if(!localStorage.getItem('watchlist')) {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } else {
        const existing = JSON.parse(localStorage.getItem("watchlist"))
        existing.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(existing))
    }
}