const yelpQuery = require("../routes/api/yelpQuery");
const bookQuery = require("../routes/api/googleBooks");
const omdbQuery = require("../routes/api/omdbQuery");

module.exports = {

  createCategory: (userInput, callback) => {
    let isMovie = false;
    let isBook = false;
    let isFood = false;
    
    let yelpApiPull = new Promise(function(resolve, reject) {
      yelpQuery.yelpQuery(userInput, (data) => {
        isFood = data.checkValue;
        resolve(isFood);
      });
    }); 
    
    let omdbQueryApiPull = new Promise(function(resolve, reject) {
      omdbQuery.searchMovie(userInput, (data) => {
        isMovie = data.checkValue;
        resolve(isMovie);         
      })
    });  

    let bookQueryApiPull = new Promise(function(resolve, reject) {
      bookQuery.bookQuery(userInput, (data) => {
        isBook = data.checkValue;
        resolve(isBook);
      })
    });

    yelpApiPull.then((valueYelp) => {
      isFood = valueYelp;
    }).then(() => {
      omdbQueryApiPull.then(function(valueOMDB) {
        isMovie = valueOMDB;
      })
    }).then (() => {
      bookQueryApiPull.then(function(valueBook) {
        isBook = valueBook;
      })
    }).then (() => {
      if (isFood === true) {
        return callback("to-eat");
      } else if (isMovie === true) {
        return callback("to-watch");
      } else if (isBook === true) {
        return callback("to-read");
      } else {
        return callback("to-buy");
      }
    });
  }
}