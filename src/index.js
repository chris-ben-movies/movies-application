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
    html += `<input id="movie-name" type="text" placeholder="Movie Name" aria-label="name" value="">`;
    html += `<select name="movie-rating" id="select-rating"><option value="Unrated" selected>Select Rating</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>`;
    html += `<button id="add-movie-btn" type="button" class="btn btn-default">Add</button>`;
    html += `</form>`;

    return html;
};


//Creates a form when the EDIT button is pressed.
const generateEditForm = function () {
    let html = "";
    html += `<form>`;
    html += `<input id="edit-name" type="text" placeholder="New Name" aria-label="name" value="">`;
    html += `<select name="edit-rating" id="edit-rating"><option value="Unrated" selected>Select New Rating</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>`;
    html += `<button id="finish-edit-btn" type="button" class="btn btn-default">Done</button>`;
    html += `</form>`;
    return html;
};




//Takes values from the HTML form and adds them to the database from user input
const createMovie = (movieTitle, movieRating) => {
    //takes the value of the input fields and assigns them as local variables
    movieTitle = $('#movie-name').val();
    movieRating = $('#select-rating').val();
    //Create a new movie object
    const newMovie = {title: movieTitle, rating: movieRating};
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
    let newRating = $('#edit-rating').val();
    //Create a new edited movie object with the new property values
    const editedMovie = {title: newTitle, rating: newRating};
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
    return fetch(url, options)
        .then(() => {
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
        // html += `<table id="movie-table"><tr><th>Title</th><th>Rating</th></tr>`;
        //Creates new movie html.
        movies.forEach(({title, rating}) => {
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

        //creates references to the DB id#'s.
        let editBtns = $('.edit-btn');
        let j = 0;
        for (let editBtn of editBtns) {
            $(editBtn).data('id', movies[j].id);
            j += 1;
        }
        //Adds click events to each edit button.
        //TODO add an edit button from database function;
        $(".edit-btn").click(function() {
            console.log($(this).data("id"));
            $('#edit-form-display').html(generateEditForm());
            $('#finish-edit-btn').attr('data-id',$(this).data('id'));
            $("#finish-edit-btn").click(function(){
                //CALL EDIT MOVIE
                editMovie($(this).data("id"));
            });
        });

        //Add a new movie form with associated button.
        $('#add-movie-form').html(generateAddForm());
        $('#add-movie-btn').click(function () {
            createMovie(newTitle, newRating);
        });

        //Final catch!
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};


//Initial write to html.
writeToHTML();



