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
  console.log('Here are all the movies:');
  let html = '';
  movies.forEach(({title, rating, id}) => {
      html += '<ul>';
      html += `<li>Title: ${title}</li>`;
      html += `<li>Rating: ${rating}</li>`;
      html+= '</ul>';
  });
    $('#movie-display').html(html);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});





