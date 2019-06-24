'use strict'; 
const tokens = require('../secrets');
const omdb = new (require('omdbapi'))(tokens.omdbKey);

module.exports = {
  searchMovie: (userListInput, callback) => {
    omdb.search({
      search: userListInput
    }).then(res => {
        callback( {checkValue: true, returnName: res[0].title} );
    }).catch((err) => {
        callback( {checkValue: false} );
    })
  }
}