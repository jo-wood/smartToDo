'use strict';
const https = require('https');

module.exports = {

  bookQuery: (userListInput, callback) => {
    let userInput = userListInput;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&printType=books&maxResults=10`;
    let titles = [];
    function checkBookTitles(booksArray) {
      for (let bookObj of booksArray){
        titles.push(bookObj.volumeInfo.title);
      }
      if (titles.length > 0) {
        callback( {checkValue: true, title: titles[0]} )
      } else {
        callback( {checkValue: false} )
      }
    }
    let chunks = [];
    let returnString;

    https.get(url, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      res.on('end', () => {
        returnString = chunks.join("");
        let returnObject = JSON.parse(returnString);
        checkBookTitles(returnObject.items);
      })
    })
  }
  
}