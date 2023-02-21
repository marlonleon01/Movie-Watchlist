const searchInput = document.getElementById("movie-name-input")
const searchBtn = document.getElementById("search-btn")
const movieContainer = document.getElementById("movie-container")
const placeholderPost = `./image/NoPosterAvailable.jpg`


function searchMovie() {
    removeMovieContainerElems()

    fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=28131219`)
        .then(res => res.json())
        .then(data => {
            for (let movie of data.Search) {
                fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=28131219`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)

                        if (data.Poster === "N/A") {
                            data.Poster = placeholderPost
                        }
                        displayMovie(data.Poster, data.Title, data.imdbRating, 
                                        data.Runtime, data.Genre, data.Plot)
                    })
            }
        })
}

searchBtn.addEventListener("click", searchMovie)

function displayMovie(imgLink, title, rating, runTime, genre, description) {
    movieContainer.innerHTML += `
        <div class="movie">
                <img src="${imgLink}" class="movie-poster">
            <div>
                <div class="movie-title-container">
                    <h2 class="movie-title">${title}</h2>
                    <i class="fa-solid fa-star star-icon"></i>
                    <p class="movie-rating">${rating}</p>
                </div>
                <div class="movie-middle-section">
                    <div class="movie-runtime-container">
                        <p class="movie-runtime">${runTime}</p>
                        <p class="movie-genre">${genre}</p>
                    </div>
                    <div class="add-to-watchlist-container">
                        <i class="fa-solid fa-plus plus-icon"></i>
                        <p class="add-to-watchlist-text">Watchlist</p>
                    </div>
                </div>
                <p class="movie-description">${description}</p>
            </div>
        </div>
    `
}


function removeMovieContainerElems() {
    movieContainer.innerHTML = ""
}
/* What to display */

/* Img, Title, Rating, RunTime, Genres, AddToWatchList, Description */
