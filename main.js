  let page = pages();
  console.log (page);
  
  const SORTBY = {
    popularity: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=1`, 
    rating: "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=1&vote_count.gte=10000", 
    releaseDate: " https://api.themoviedb.org/3/discover/movie?api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=true&page=1"
  }
  
  const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=1";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=1&query=";
  const main = document.querySelector('.movieland');



//const allMovies = [];
mostPopular();
mostRated();
latest();

function pages () {
  let pages = 1;
  return pages;
}

getMovies(SORTBY.popularity);

function getMovies (url) {
  
  fetch(url).then(res => res.json())
  .then(function(data){
    console.log(data);
    movies = data.results;
    movies.forEach((movie) => {
      
    })
    
  });

}

function returnMovies (url, RUN) {
  let allMovies = '';
  fetch(url).then(res => res.json())
  .then(function(data){
    console.log(data);
    movies = data.results;
    movies.forEach((movie) => {
      if (!movie.poster_path) {
        let html = `<div class="movie">
          <div class="movie-card">
              
            <div class="image">
              <img src="images/favicon.jpg" class="thumbnail">
            </div>
            
            <h3>
              ${movie.title}
            </h3>
              
          </div>
          </div>`;
          
          allMovies += html;
          
      } else if (movie.poster_path) {
          const html = `<div class="movie">
        <div class="movie-card">
            
          <div class="image">
            <img src="${IMG_PATH + movie.poster_path}" class="thumbnail">
          </div>
          
          <h3>
            ${movie.title}
          </h3>
            
        </div>
        </div>`;
        
        allMovies += html;
        }
        
    document.querySelector(RUN).innerHTML = allMovies;
});});}

function mostPopular () {
returnMovies(SORTBY.popularity, '.popular-movies');
}

function mostRated () {
  returnMovies(SORTBY.rating, '.most-rated');
}

function latest () {
  const allMovies = returnMovies(SORTBY.releaseDate, '.latest-movies');
}


const search = document.querySelector('#query');
const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  main.innerHTML = '<div class="searched"></div>';
  
  const searchItem = search.value;
  
  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem, '.searched');
    
    search.value = '';
  }
});
