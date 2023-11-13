movieLand ();

function movieLand  () {
  const sections = [[], [], [], []];
  let pages = 0;
  let page = updatePage();
  
  
  
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=${page}&query=`;
  


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
  
  function sortMovies (url, RUN, index) {
    getMovies(url, RUN, index)
  }

function updatePage () {
      let update = (pages += 1);
      return update;
  }
  
  
  for (let i = 0; i < 5; i++) {
    const SORTBY = {
    popularity: `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=${i+1}`, 
    rating: `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=${i+1}&vote_count.gte=10000`, 
    releaseDate: `https://api.themoviedb.org/3/discover/movie?api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=true&page=${i+1}`
  }
  
    
    sortMovies(SORTBY.popularity, '.popular-movies', 0);
    sortMovies(SORTBY.rating, '.most-rated', 1);
    sortMovies(SORTBY.releaseDate, '.latest-movies', 2);
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