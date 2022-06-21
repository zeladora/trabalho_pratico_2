//valores iniciais
const API_KEY = "1489704850ae98f0025316bad9a70b31";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://www.themoviedb.org/movie/";

const url =
  "https://api.themoviedb.org/3/search/movie?api_key=1489704850ae98f0025316bad9a70b31&language=pt-BR";

//selecionando elemento do DOM
const searchButton = document.querySelector("#pesquisar");
const inputButton = document.querySelector("#inputpesquisar");
const moviesSearchable = document.querySelector("#movies-searchable");
const moviesContainer = document.querySelector("#movies-container");


function movieSection(movies) {
  return movies.map((movie) => {
    if (
      movie.poster_path &&
      movie.title &&
      movie.release_date &&
      movie.overview
    ) {
      return `
        <div class="col-lg-3 col-md-6 destaques">   
            <img class="imagemDestaque" src=${IMAGE_URL + movie.poster_path} data-id=${movie.id}>
            <p>Título: ${movie.title}</p>
            <p>Data: ${movie.release_date}</p>
            <p>Sinopse: ${movie.overview}</p> 
        </div>`;
    }
  }).join('');
}

function createMovieContainer(movies) {
  const movieElement = document.createElement("section");
  movieElement.setAttribute("class", "row card_destaque");

  const movieTemplate = `${movieSection(movies)}`;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function renderSearchMovies(data) {
  moviesSearchable.innerHTML = "";
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  moviesSearchable.appendChild(movieBlock);
  console.log("Data: ", data);
}

searchButton.onclick = function (event) {
  event.preventDefault();
  const value = inputButton.value;
  //window.open("index2.html");

  var div = document.getElementById("movies-searchable");
  div.style.display = "flex";

  const newUrl = url + "&query=" + value;

  fetch(newUrl)
    .then((res) => res.json())
    .then(renderSearchMovies)
    .catch((error) => {
      console.log("Erro:", error);
    });
  inputButton.value = "";
  console.log("Value: ", value);
};

document.onclick = function (event) {
  const target = event.target;

  if (target.tagName.toLowerCase() === "img") {
    console.log("event :", event)
    window.open(BASE_URL + target.dataset.id);
  }
};





function requestMovies(url, onComplete, onError) {
  fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
}

function renderMovies(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  moviesContainer.appendChild(movieBlock);
  console.log("Data: ", data);
}

function handleError(error){
  console.log('Erro: ', error)
}

function getPopularMovies() {
  const path = '/movie/popular';
  const url = 
  `http://api.themoviedb.org/3${path}?api_key=1489704850ae98f0025316bad9a70b31&language=pt-BR`;

  requestMovies(url, renderMovies, handleError);
}


getPopularMovies()

