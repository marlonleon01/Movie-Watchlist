const searchInput = document.getElementById("movie-name-input")
const searchBtn = document.getElementById("search-btn")

searchBtn.addEventListener("click", searchMovie)

function searchMovie() {
    console.log(searchInput.value)
}


// fetch(`http://www.omdbapi.com/?s=${}&apikey=28131219`)
//     .then(res => res.json())
//     .then(data => console.log(data))