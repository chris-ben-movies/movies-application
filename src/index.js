/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
const $ = require('jquery');

/**
 * require style imports
 */
//Importing movie database
const {getMovies} = require('./api.js');

//Creates THE search form
const generateSearchForm = () => {
    let html = "";
    html += `<form>`;
    html += `<input id="movie-name" type="text" placeholder="Movie Name" aria-label="name" value="">`;
    html += `<select name="movie-rating" id="select-rating"><option value="default" selected>Select Rating</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>`;
    html += `<button id="add-movie-btn" type="button" class="btn btn-default">Add</button>`;
    html += `</form>`;

    return html;
};

// const generateMovieID = () => {
//     getMovies().then((data) => {
//         let newId = data.map(({id}) => {
//             console.log(id);
//         });
//
//         console.log(newId = newId.lastIndexOf(id)+1);
//
//         console.log(data);
//     });
// };
//
// generateMovieID();


//Takes values from the HTML form and adds them to the database from user input
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


//Function that writes the HTML
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
        $('#add-movie-btn').click(() => createMovie(newTitle, newRating, 4));
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};


let newTitle;
let newRating;


writeToHTML();

