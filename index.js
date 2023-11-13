movieLand ();

function movieLand  () {
  let page = 1;
  
  
  
  const SORTBY = {
    popularity: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=${page}`, 
    rating: `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=${page}&vote_count.gte=10000`, 
    releaseDate: `https://api.themoviedb.org/3/discover/movie?api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=true&page=${page}`
  }
  
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=${page}&query=`;
  
const sections = [[], [], [], []]

  function getMovies (url, RUN, index) {
    let moviesHtml = '';
    fetch(url).then(res => res.json())
    .then(function load (data){
      console.log(data)
      
      const allMovies = data.results;
      allMovies.forEach((movie) => {
      sections[index].push(movie)
      });
      
      sections[index].forEach((movie) => {
        let html = `
        <div class="movie">
        <div class="movie-card">
            
          <div class="image">
            <img src="${IMG_PATH + movie.poster_path}" class="thumbnail">
          </div>
          
          <h3>
            ${movie.title}
          </h3>
            
        </div>
      </div>`;
          
          moviesHtml += html
      });
      
      document.querySelector(RUN).innerHTML = moviesHtml;
    });
  
  }
  
  
function mostPopular () {
    
  getMovies(SORTBY.popularity, '.popular-movies', 0);
}


function mostRated () {
  
  getMovies(SORTBY.rating, '.most-rated', 1);
}

function latest () {
  getMovies(SORTBY.releaseDate, '.latest-movies', 2);
}

for (let i = 0; i < 3; i++) {
    page += 1;
    mostPopular();
    mostRated();
    latest();
    
    
  }


const main = document.querySelector('.movieland');

const search = document.querySelector('#query');
  const form = document.querySelector('#form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sections[3] = [];
    main.innerHTML = '<div class="searched"></div>';
    
    const searchItem = search.value;
    if (searchItem) {
      for (let i = 0; i < 5; i++) {
        getMovies(SEARCHAPI + searchItem, '.searched', 3);
        search.value = '';
      }
    }
  });
}