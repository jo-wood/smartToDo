'use strict';

const yelp = require('yelp-fusion');
const stringSimilarity = require('string-similarity');
const tokens = require('../secrets');

module.exports = {

  yelpQuery: (userListInput, callback) => {
    const apiKey = tokens.yelpKey;
    const client = yelp.client(apiKey);
    const searchRequest = {
      term: userListInput,
      categories: 'restaurants, All', 
      location: 'toronto, on'
    };
    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      let returnBody = firstResult;
      if (typeof returnBody === 'undefined' || !returnBody.hasOwnProperty('name')) {  
        return callback( {checkValue: false} );
      }
      let returnName = returnBody.name.split(" ").join("").toLocaleLowerCase();
      let cleanReturnName = returnName.replace(/[|&;'$%@"<>()+,]/g, "");
      let userSearchInput = userListInput.split(" ").join("");
      let userInputCompare = stringSimilarity.compareTwoStrings(userSearchInput, cleanReturnName);
        switch(true) {
          case (userInputCompare > 0.60):
            callback( {compareRating: userInputCompare, checkValue: true, returnName: returnBody.name} );
            break;
          default:
            callback( {compareRating: userInputCompare, checkValue: false} );
        }
    }).catch(e => {
      console.log('RETURN ERROR: ', e);
    });
  }

}