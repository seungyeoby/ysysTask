let currentIndex = 0;
const initialLoadCount = 20;
const moviesPerPage = 10;

const list = document.getElementById("movieList");
const trigger = document.getElementById("scrollTrigger");
const imgBaseUrl = "https://image.tmdb.org/t/p/w440_and_h660_face";

// ✅ 정확한 철자: movieRender
function movieRender(count) {
  const nextMovies = movieList.results.slice(currentIndex, currentIndex + count);

  nextMovies.forEach(movie => {
    let path = movie.backdrop_path;
    if (!path) {
      path = movie.poster_path;
    }
    const releaseYear = movie.release_date.substring(0,4)
    console.log(releaseYear)
    

    const col = document.createElement('div');
    col.className = "col";

    col.innerHTML = `
      <div class ="m-auto pt-3">
        <a href="./movie.html?id=${movie.id}">
          <img src="${imgBaseUrl + path}" alt="${movie.original_title}" />
          <p class="text-center text">${releaseYear}년개봉</p>
          <p class="text-center text">${movie.original_title}</p>    
        </a>
      </div>
    `;

    list.appendChild(col);
  });

  currentIndex += count;

  if (currentIndex >= movieList.results.length) {
    observer.unobserve(trigger);
    trigger.textContent = "🎉 모든 영화가 로드되었습니다!";
  }
}

// ✅ IntersectionObserver 정의
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      movieRender(moviesPerPage); // 철자 통일!
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  if (!list || !trigger) {
    console.error("❗ movieList 또는 scrollTrigger 요소가 존재하지 않습니다.");
    return;
  }

  movieRender(initialLoadCount);
  observer.observe(trigger);
});
