// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API:

async function loadMovies(searchTerm) {
  const url = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
  const response = await fetch(`${url}`);
  const data = await response.json();
  if (data.Response === "True") {
    displayMovieList(data.Search);
    // console.log(data);
    // console.log(data.Search);
  }
}

// findMovies:

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  // console.log(searchTerm);
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

// display movies on the page:
function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    // console.log(movieListItem);
    movieListItem.dataset.id = movies[i].imdbID;
    movieListItem.classList.add("search-list-item");
    if (movies[i].Poster !== "N/A") moviePoster = movies[i].Poster;
    else moviesPoster = "image-not-found.png";
    movieListItem.innerHTML = `
    <div class="search-thumb">
        <img src=${moviePoster} alt="">
    </div>
    <div class="search-item-info">
        <h3>${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
    </div>
    `;
    searchList.appendChild(movieListItem);;
  }
  loadMovieDetails();

}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
      const movieDetails = await result.json();
      // console.log(movieDetails);
      displayMovieDetails(movieDetails);
    });
    // console.log(movie);
  });
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
     <div class="movie-poster">
        <img src = "${
          details.Poster !== "N/A" ? details.Poster : "image-not-found.png"
        }" alt="movie poster">
     </div>
     <div class="movie-info">
        <h3 class="movie-title">
            ${details.Title}
        </h3>
        <ul class="movie-misc-info">
            <li class="year">Year: ${details.Year}</li>
            <li class="rated">Ratings: ${details.Rated}</li>
            <li class="released">Released: ${details.Released}</li>
        </ul>
        <p class="genre"><b>Genre:</b> ${details.Genre}</p>
        <p class="writer"><b>Writer:</b> ${details.Writer}</p>
        <p class="actors"><b>Actors:</b>${details.Actors}</p>
        <p class="plot"><b>Plot:</b> ${details.Plot} </p>
        <p class="language"><b>Language:</b> ${details.Language}</p>
        <p class="awards"><b><i class="fa-solid fa-award"></i></b>${
          details.Awards
        }</p>
     </div>
`;
}

window.addEventListener("click", function (event) {
  if (event.target.classList !== "form-control") {
    searchList.classList.add("hide-search-list");
    // movieSearchBox.value = "";
  }
});
loadMovies("lord of the Rings")
