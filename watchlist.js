const watchlistContainer = document.getElementById("watchlist-container")
const watchlistEmptyContainer = document.getElementById("watchlist-empty-container")
const watchlistBtn = document.getElementsByClassName("add-to-watchlist-container")

function renderWatchlist () {
    const watchlist = JSON.parse(localStorage.watchlist)
    for (let movie of watchlist) {
        watchlistContainer.innerHTML += `
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
                        <div class="add-to-watchlist-container" id="add-to-watchlist-container">
                            <i class="fa-solid fa-minus minus-icon"></i>
                            <p class="add-to-watchlist-text">Remove</p>
                        </div>
                    </div>
                    <p class="movie-description">${movie.Plot}</p>
                </div>
            </div>
        `   
    }
}

function removeWatchListItem(movie) {
    const newWatchlist = JSON.parse(localStorage.watchlist)
    newWatchlist.splice(movie, 1)
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist))
}

document.onload = checkForWatchlist()

function checkForWatchlist() {
    if (!localStorage.watchlist || localStorage.watchlist == "[]") {
        watchlistEmptyContainer.style.display = "block"
    } else if (localStorage.watchlist) {
        watchlistEmptyContainer.style.display = "none"
        renderWatchlist()
    }

    for (let i = 0; i < watchlistBtn.length; i++) {
        watchlistBtn[i].addEventListener("click", () => {
            removeWatchListItem(i);
            location.reload()
        })
    }
}