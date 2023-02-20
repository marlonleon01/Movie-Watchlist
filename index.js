const searchInput = document.getElementById("movie-name-input")
const searchBtn = document.getElementById("search-btn")

function searchMovie() {
    fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=28131219`)
        .then(res => res.json())
        .then(data => {
            for (let movie of data.Search) {
                fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=28131219`)
                    .then(res => res.json())
                    .then(data => console.log(data))
            }
        })
}

searchBtn.addEventListener("click", searchMovie)

function displayMovie() {

}

/* What to display */

/* Img, Title, Rating, RunTime, Genres, AddToWatchList, Description */
