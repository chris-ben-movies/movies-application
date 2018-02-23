/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');


getMovies().then((movies) => {
  let html = '';
  movies.forEach(({title, rating, id}) => {
      html += `<div class='row'>`;
      html += `<div class="col-xs-6 text-left">Title: ${title}`;
      html += `Rating: ${rating}</div></div>`;
  });
    $('#movie-display').html(html);
    $('#add-movie-form').html(generateSearchForm());
    $('#add-movie-btn').click(() => createMovie(newTitle, newRating, 3));
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

const generateSearchForm = () => {
    let html = "";
    html += `<form>`;
    html += `<input id="movie-name" type="text" placeholder="Movie Name" aria-label="name" value="">`;
    html += `<select name="movie-rating" id="select-rating"><option value="default" selected>Select Rating</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>`;
    html += `<button id="add-movie-btn" type="button" class="btn btn-default">Add</button>`;
    html += `</form>`;

    return html;
};


let newTitle;
let newRating;




const createMovie = (movieTitle, movieRating, movieId) => {
    movieTitle = $('#movie-name').val();
    movieRating = $('#select-rating').val();
    const newMovie = {title: movieTitle, rating: movieRating, id: movieId};
    const url = 'api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie),
    };

    return fetch(url, options)
        .then(() => {
            writeToHTML();
            console.log('Success')
        })
        .catch(() => console.log("FAILURE!"));
};

const writeToHTML = () => {
    getMovies().then((movies) => {
        let html = '';
        movies.forEach(({title, rating, id}) => {
            html += `<div class='row'>`;
            html += `<div class="col-xs-6 text-left">Title: ${title}`;
            html += `Rating: ${rating}</div></div>`;
        });
        $('#movie-display').html(html);
        $('#add-movie-form').html(generateSearchForm());
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};






