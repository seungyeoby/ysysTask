
document.getElementById("searchMovie").addEventListener("input", movieSearch);


function movieSearch(event) {
  if (event) event.preventDefault();
  console.log("search 시작")
  const search = document.getElementById("searchMovie").value.toLowerCase();
  const list = document.getElementById("movieList"); 
  const imgBaseUrl = "https://image.tmdb.org/t/p/w440_and_h660_face";

  list.innerHTML = "";
  movieList.results.forEach(movie => {
    const title = (movie.title || movie.original_title || "").toLowerCase();
    if(title.includes(search)) {
      let path = movie.backdrop_path;
      if (!path) {
        path = movie.poster_path;
      }
      const col = document.createElement('div');
      col.className = "col";
  
      col.innerHTML = `
      <div class ="m-auto pt-3">
        <a href="./movie.html?id=${movie.id}">
          <img src="${imgBaseUrl + path}" alt="${movie.original_title}" />
          <p class="text-center text">${movie.original_title}</p>    
        </a>
      </div>
      `;
  
      list.appendChild(col);
    }
  
  })

}