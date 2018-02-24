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

const generateEditForm = function () {
    let html = "";
    html += `<form>`;
    html += `<input id="edit-name" type="text" placeholder="New Name" aria-label="name" value="">`;
    html += `<select name="edit-rating" id="edit-rating"><option value="default" selected>Select New Rating</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>`;
    html += `<button id="finish-edit-btn" type="button" class="btn btn-default">Done</button>`;
    html += `</form>`;



    return html;
};




//Takes values from the HTML form and adds them to the database from user input
const createMovie = (movieTitle, movieRating) => {
    movieTitle = $('#movie-name').val();
    movieRating = $('#select-rating').val();
    const newMovie = {title: movieTitle, rating: movieRating};
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

//Delete movie function
const deleteMovie = (id) => {
    const url = 'api/movies/' + id;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(newMovie),
    };
    return fetch(url, options)
        .then(() => {
            writeToHTML();
            console.log('Success')
        })
        .catch(() => console.log("FAILURE!"));
};

//Edit Movie Function
// const editMovie = (newMovieTitle, newMovieRating, id) => {
//     newMovieTitle = $('#edit-name').val();
//     newMovieRating = $('#edit-rating').val();
//     const editedMovie = {title: newMovieTitle, rating: newMovieRating};
//     const url = 'api/movies/' + id;
//     const options = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editedMovie),
//     };
//     return fetch(url, options)
//         .then(() => {
//             writeToHTML();
//             console.log('Success')
//         })
//         .catch(() => console.log("FAILURE!"));
// };





//Function that writes the HTML
const writeToHTML = () => {
    getMovies().then((movies) => {
        let html = '';
        movies.forEach(({title, rating, id}) => {
            html += `<div class='row'>`;
            html += `<div class="col-xs-6 text-left"><button class="edit-btn glyphicon glyphicon-pencil"></button><button class="delete-btn glyphicon glyphicon-remove"></button>Title: ${title}`;
            html += `Rating: ${rating}</div></div>`;
        });

        //Writes Each movie to the HTML
        $('#movie-display').html(html);

        //creates references to the DB id#'s.
        let deleteBtns = $('.delete-btn');
        let i = 0;
        for (let deleteBtn of deleteBtns) {
            $(deleteBtn).data('id', movies[i].id);
            i += 1;
        }
        //Adds click events to each delete button.
        //TODO add a delete from database function;
        $(".delete-btn").click(function() {
            console.log($(this).data("id"));
            deleteMovie($(this).data("id"));
        });

        let editBtns = $('.edit-btn');
        let j = 0;
        for (let editBtn of editBtns) {
            $(editBtn).data('id', movies[j].id);
            j += 1;
        }
        //Adds click events to each delete button.
        //TODO add a delete from database function;
        $(".edit-btn").click(function() {
            console.log($(this).data("id"));
            $('#edit-form-display').html(generateEditForm());
            $("#finish-edit-btn").click(function(){
                //CALL EDIT MOVIE
                editMovie($(this).data("id"));
               // console.log("HEY CLICKED DONE!");
            });
            // console.log($("#finish-edit-btn").html());
            // editMovie($(this).data("id"));
        });

        $('#add-movie-form').html(generateSearchForm());
        $('#add-movie-btn').click(function () {
            createMovie(newTitle, newRating);
        });

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};






let newTitle;
let newRating;
writeToHTML();



