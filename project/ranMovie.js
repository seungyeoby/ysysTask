document.addEventListener("DOMContentLoaded",()=> {

  const slideContainer = document.querySelector('.swiper-wrapper');
const imgBaseUrl = "https://image.tmdb.org/t/p/w440_and_h660_face";



  const movies = [];
  for (let i =0; i<6; i++){
    const randomMovie = movieList.results[Math.floor(Math.random()*movieList.results.length)];

    movies.push(randomMovie);
  }
  movies.forEach(movie => {
  const path = movie.poster_path || movie.backdrop_path || "default.jpg";

  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');

  slide.innerHTML = `
    <a href="./movie.html?id=${movie.id}">
      <img src="${imgBaseUrl + path}" cover alt="${movie.original_title}" class="img-fluid rounded">
    </a>
  `;

  slideContainer.appendChild(slide);
});

});


