/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');
const $ = require('jquery');

/**
 * require style imports
 */
//Importing movie database
const {getMovies} = require('./api.js');

//Creates the AddMovie form at the start of the page.
const generateAddForm = () => {
    let html = "";
    html += `<form>`;
    html += `<div class="row">`;
    html += `<div class="col-xs-12">`;
    html += `<input name="select-rating" class="movie-name-input" id="movie-name" type="text" placeholder="Add a Movie" aria-label="name" value="">`;
    html += `</div></div>`;
    html += `<div class="row">`;
    html += `<div class="col-xs-12">`;
    html += `<select class="col-xs-12 movie-genre-select"><option value="Unspecified" selected>Select a Genre</option><option value="Action/Adventure">Action/Adventure</option><option value="Comedy">Comedy</option><option value="Drama">Drama</option><option value="Horror">Horror</option><option 
value="Indie">Indie
</option><option value="Romance">Romance</option><option 
value="Sci-Fi">Sci
-Fi</option><option value="Thriller">Thriller</option></select>`;
    html += `</div></div>`;
    html += `<div class="row">`;
    html += `<div class='col-xs-12'>`;
    html += `<label><input name="movie-rating" class="select-rating" type="radio" value="1" checked> <span class="glyphicon glyphicon-star"></span></label><br>`;
    html += `<label><input name="movie-rating" class="select-rating" type="radio" value="2"> <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label><br>`;
    html += `<label><input name="movie-rating" class="select-rating" type="radio" value="3"> <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span></label><br>`;
    html += `<label><input name="movie-rating" class="select-rating" type="radio" value="4"> <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label><br>`;
    html += `<label><input name="movie-rating" class="select-rating" type="radio" value="5"> <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label><br>`;
    html += `</div></div>`;
    html += `<div class='row'>`;
    html += `<div class="col-xs-12">`;
    html += `<button id="add-movie-btn" type="button" class="btn btn-success submit-button">Add Movie</button></div></div>`;
    html += `</form>`;
    return html;
};


//Creates a form when the EDIT button is pressed.
const generateEditForm = function () {
    let html = "";
    html += `<form class="edit-form">`;
    html += `<div class="row">`;
    html += `<div class="col-xs-12">`;
    html += `<input class="edit-name-input" id="edit-name" type="text" placeholder="Edit Movie Title" aria-label="name" value=""></div></div>`;
    html += `<div class="row">`;
    html += `<div class="col-xs-12">`;
    html += `<select class="col-xs-12 movie-genre-select"><option value="Unspecified" selected>Select a Genre</option><option value="Action/Adventure">Action/Adventure</option><option value="Comedy">Comedy</option><option value="Drama">Drama</option><option value="Horror">Horror</option><option 
value="Indie">Indie
</option><option value="Romance">Romance</option><option 
value="Sci-fi">Sci
-Fi</option><option value="Thriller">Thriller</option></select>`;
    html += `</div></div>`;
    html += `<div class="row">`;
    html += `<div class="col-xs-12">`;
    html += `<label><input name="edit-rating" class="select-rating" type="radio" value="1" checked> <span class="glyphicon glyphicon-star"></span></label><br>`;
    html += `<label><input name="edit-rating" class="select-rating" type="radio" value="2"> <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label><br>`;
    html += `<label><input name="edit-rating" class="select-rating" type="radio" value="3"> <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span></label><br>`;
    html += `<label><input name="edit-rating" class="select-rating" type="radio" value="4"> <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label><br>`;
    html += `<label><input name="edit-rating" class="select-rating" type="radio" value="5"> <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> </label><br>`;
    html += `<div class="row">`;
    html += `<div class="col-xs-12">`;
    html += `<button id="finish-edit-btn" type="button" class="btn btn-info submit-button">Done Editing</button></div></div>`;
    html += `</form>`;
    return html;
};

const displayLoadBar = () => {
    let html = "";
    html += `<div><div class="span4"></div><div class="span4"><img id="main-loading-img" class="center-block" src="img/loading-bar.gif" alt="loading"></div><div class="span4"></div></div>`;
    return html;
};



//Takes values from the HTML form and adds them to the database from user input
    const createMovie = (movieTitle, movieRating, movieGenre) => {
    $('#add-movie-btn').addClass('disabled').removeClass('btn-success').addClass('btn-default');
    $('input, select').addClass('disabled').addClass('disabled-field');



    //takes the value of the input fields and assigns them as local variables

    movieRating = $('input[name=movie-rating]:checked').val();
    movieTitle = $('#movie-name').val();
    movieGenre = $('.movie-genre-select').val();


    //Create a new movie object
    const newMovie = {title: movieTitle, rating: movieRating, genre: movieGenre};
    //Pull the database for the movies
    const url = 'api/movies';
    //Options for the request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //Make the request into a JSON string to be interpreted correctly.
        body: JSON.stringify(newMovie),
    };
        $('.form-displays').hide();
        $('#movie-display').html(displayLoadBar());

    //Make the request
    return fetch(url, options)
        .then(() => {
            //When the request returns, write the new movie to the page.
            writeToHTML();
            console.log('Success')
        })
        .catch(() => console.error("FAILURE!"));
};

//Delete movie function takes in an ID
const deleteMovie = (id) => {
    //find the id in the Data base
    const url = 'api/movies/' + id;
    //Nuke the object associated with that ID
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    $('.form-displays').hide();
    $('#movie-display').html(displayLoadBar());
    return fetch(url, options)
        .then(() => {
            //Rewrite the html
            writeToHTML();
            console.log('Success');
        })
        .catch(() => console.error("FAILURE!"));
};

// Edit Movie Function takes in the ID associated with the button
const editMovie = (id) => {
    //Get the new title and rating from the input fields.
    let newTitle = $('#edit-name').val();
    let newRating = $('input[name=edit-rating]:checked').val();
    let newGenre = $('.movie-genre-select').val();
    //Create a new edited movie object with the new property values
    const editedMovie = {title: newTitle, rating: newRating, genre: newGenre};
    //get the associated object in the Database
    const url = `api/movies/${id}`;
    //Use patch to change the properties
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        //Convert request into JSON string to be interpreted correctly.
        body: JSON.stringify(editedMovie),
    };

    $('.form-displays').hide();
    $('#movie-display').html(displayLoadBar());

    return fetch(url, options)
        .then(() => {
            $('.edit-form').html('');
            //Rewrite the page with the new content
            writeToHTML();
            console.log('Success')
        })
        .catch(() => console.error("FAILURE!"));
};


//Function that writes the HTML
const writeToHTML = () => {
    //Pulls the database
    getMovies().then((movies) => {
        let html = '';
        html += `<table id="movie-table" class="col-xs-6 text-left table-hover"><tr><th>Options</th><th>Title</th><th>Genre</th><th>Rating</th></tr>`;
        //Creates new movie html.
        movies.forEach(({title, rating, genre}) => {
            html += `<tr><td><button class="edit-btn glyphicon glyphicon-pencil btn btn-info col-xs-6"></button><button class="delete-btn glyphicon glyphicon-remove btn btn-danger col-xs-6"></button></td><td>${title}</td><td>${genre}</td><td>${rating}</td></tr>`;
        });
        html += `</table>`;

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

        //creates references to the DB id#'s.
        let editBtns = $('.edit-btn');
        let j = 0;
        for (let editBtn of editBtns) {
            $(editBtn).data('id', movies[j].id);
            j += 1;
        }

        //SHows the add form again
        $('.form-displays').show();

        //Adds click events to each edit button.
        //TODO add an edit button from database function;
        $(".edit-btn").click(function() {

            let selectedTitle = $(this).parent().next().text();
            console.log($('#edit-name').val($(this).parent().next().text()));
            console.log(selectedTitle);

            let selected = $(this).parent().parent().hasClass("highlight");
            $("tr").removeClass("highlight");
            $('.form-displays').html(generateAddForm());
            if(!selected) {
                $(this).parent().parent().addClass("highlight");
                $('.form-displays').html(generateEditForm());
            }


            $('#finish-edit-btn').attr('data-id',$(this).data('id'));
            $("#finish-edit-btn").click(function(){
                //CALL EDIT MOVIE
                if ($('#edit-name').val() !== "") {
                    editMovie($(this).data("id"));
                } else {
                    $('#edit-name').addClass('required-field');

                    $('#edit-name').keyup(function() {
                        $(this).removeClass('required-field');
                    })

                }


            });
        });
        //Add a new movie form with associated button.
        $('.form-displays').html(generateAddForm());
        $('#add-movie-btn').click(function () {

            if ($('#movie-name').val() !== "") {
                createMovie(newTitle, newRating);
            } else {
                $('#movie-name').addClass('required-field');

                $('#movie-name').keyup(function() {
                    $(this).removeClass('required-field');
                })

            }

        });

        //Final catch!
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};

//Initial write to html.
let newTitle;
let newRating;
writeToHTML();



