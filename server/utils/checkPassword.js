const ENV         = process.env.ENV || "development";
const knexConfig  = require("./../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {

  authenticateLogin: (email, inputPassword, callback) => {
    knex
      .select('password', 'id')
      .from('users')
      .where('email', email)
      .then( (results) => {
        if (results.length === 0) {
          callback( {authValue: false} );
        } else if (results[0].password === inputPassword) {
          console.log('RESULTS: ', results);
          callback( {authValue: true, userId: results[0].id} );
        }
    });
  }

}