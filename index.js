const base_url = 'http://www.omdbapi.com/?apikey=';
const api_key = '3ae57521&'

const form = document.querySelector("#searchForm")
const addMovie = document.querySelector("#addMovies")
const movie = document.querySelector("#movie")

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchText = form.elements.search.value;
    getmovie(searchText);
})

const getmovie = async (searchText) => {
    try {
        const url = base_url + api_key + '&s=' + searchText;
        const response = await axios.get(url);
        console.log(response.data);
        let results = response.data.Search;
        addMovie.innerHTML = "";
        results.forEach(function (movie) {
            const { Poster, Title, imdbID } = movie;
            console.log(imdbID);
            let output = "";
            output = document.createElement("div");
            output.classList.add('movies');
            output.innerHTML = `
                        <div class="well">
                        <img class="poster-img" src="${Poster}" alt="movie poster">
                        <h4 class="text-white text-center text-wrap">${Title}</h4>
                        <h4 class="text-center">
                        <a onclick="movieSelected('${imdbID}')" class="btn btn-info btn-sm" 
                        href="#!"> Movie info </a>
                        </h4>
                        </div>`
            addMovie.appendChild(output);
        });
    }
    catch (e) {
        console.log(e);
    }
}





function movieSelected(id) {
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieID');
    const url = base_url + api_key + '&i=' + movieId;
    axios.get(url).then(data => {
        const { Title, Plot, Genre, Actors, Director, Writer,
            Rated, Released, Language, Runtime, Awards,
            imdbID, Production, Poster, imdbRating } = data.data

        let output = document.createElement('div')
        output.innerHTML = `
        <div class="text-center my-3">
            <img src="${Poster}" alt="movie poster"/>
        </div>
            </div>
                <h2 class="text-white">${Title}</h2>
                <p class="text-white">${Plot}</p>
            <ul class="list-group">
                    <li class="list-group-item"><b>Genre:</b> ${Genre}</li>
                    <li class="list-group-item"><b>Released:</b> ${Released}</li>
                    <li class="list-group-item"><b>Rated:</b> ${Rated}</li>
                    <li class="list-group-item"><b>IMDB Rating:</b> ${imdbRating}</li>
                    <li class="list-group-item"><b>Director:</b> ${Director}</li>
                    <li class="list-group-item"><b>Writer:</b> ${Writer}</li>
                    <li class="list-group-item"><b>Actors:</b> ${Actors}</li>
                </ul>
            
            <a href="index.html" class="btn btn-lg bg-primary text-white my-3" >Go back</a>
        `
        movie.appendChild(output)
    })
}
