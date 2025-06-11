function movieDetails() {
  const urlParams = new URLSearchParams(window.location.search)
  const movieId = urlParams.get("id");
  console.log('영화의 id=', movieId)
  if(!movieId) {
    alert("영화가 없습니다.")
    return
  }

  const movie = movieList.results.find(m => m.id == movieId);
  console.log(movie)
  if(!movie) {
    alert("영화 정보가 없습니다.")
    return
  }


 const imgBaseUrl = "https://image.tmdb.org/t/p/w440_and_h660_face";
  const path = movie.backdrop_path || movie.poster_path || "default.jpg";
  document.getElementById('moviePoster').src = `${imgBaseUrl + path}`
  document.getElementById('moviePoster').alt = `${movie.original_title}`
  document.getElementById("movieTitle").textContent = `${movie.original_title}`
  // document.getElementById("movieGenre").textContent = `장르: ${movie.genre_ids}`
  document.getElementById("movieOverview").textContent = `${movie.overview}`



const movieGenre = document.getElementById("movieGenre");

const matchedGenre = movie.genre_ids.map(gid => genres.find(g => g.id === gid)?.name).filter(Boolean);

movieGenre.textContent = "장르 : " + matchedGenre.join(",");


  document.getElementById("moviePopularity").innerHTML = `
  <strong>
  👍 좋아요: 
  </strong>
    <br>
    ${movie.popularity}
  `
    document.getElementById("movieRelease").innerHTML = `
    <strong>
    📅 개봉일:
    </strong>
      <br>
    ${movie.release_date}
  `
   const average = Math.floor((movie.vote_average)*10)  / 10
    document.getElementById("movieVoteAverage").innerHTML = `
    <strong>
    ⭐ 평점:
    </strong>
      <br>
    ${average} /10
  `

  // 별점 그리기
function renderStar(score) {
  const starEl = document.getElementById("starRating");
  const starScore = Math.floor(score);
  let stars ="";
  for(let i=0; i<=9; i++){
     stars += i <= starScore ? '⭐' : '☆';
  }
  starEl.innerHTML = stars + ` <span class="ms-2">${score} / 10</span>`;
}

renderStar(average)


}

