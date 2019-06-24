# Smart ToDo List

## App Summary

A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list. Each todo created should be categorized as one of:

* Film / Series (To watch)
* Restaurants, cafes, etc. (To eat)
* Books (To read)
* Products (To buy)

Users are able to change a category of an item in case it was mis-categorized or could not be categorized at all.

Users are able to register, log in, log out and update their profile.

This app was produced in collaboration with fellow Lighthouse labbers: [@mythily]('https://github.com/mmythily') and [@alex]('https://github.com/alex-ac2').

## Explore 'smartCat':

Create a new account by clicking on the register link ('/register' route) from within the homepage ('/' is also the '/login' route):

!['Main Page (not logged in)'](https://github.com/jo-wood/smartToDo/blob/master/docs/login_page.png)

Add a new ToDo! If the category set by the app is incorrect, use the drag and drop feature to move it to the approiate list. (Note: *functionality for the drop down re-categorizing menu not yet implemented*).

!['Main List Page (logged in)'](https://github.com/jo-wood/tinyApp/blob/master/docs/main_lists_page.png)

## Getting Started

**GETTING STARTED:**

* Install all dev dependencies (using the `npm install` command)
* Run the development web server using the `npm run local` command
  * Open the browser on `http://localhost:8080/` or `http://localhost:8080/my-list`
    * *note the port set is 8080*

## Dev Dependencies

* Node 5.10.x or above
* NPM 3.8.x or above
* expressJS
* knex
* knex-logger
* pg
* body-parser
* cookie-parser
* dotenv
* ejs
* morgan
* node-sass-middleware
* omdbapi
* string-similarity
* yelp-fusion
