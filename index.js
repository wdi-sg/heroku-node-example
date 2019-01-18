const express = require('express');
const pg = require('pg');
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

//require the url library
//this comes with node, so no need to yarn add
const url = require('url');

//check to see if we have this heroku environment variable
if( process.env.DATABASE_URL ){

  //we need to take apart the url so we can set the appropriate configs

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{

  //otherwise we are on the local network
  var configs = {
      user: 'akira',
      host: '127.0.0.1',
      database: 'testdb',
      port: 5432
  };
}

const pool = new pg.Pool(configs);

// Init express app
const app = express();

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {

  pool.query('SELECT * FROM pokemon', (error, queryResult) => {
    if (error) console.error('error!', error);

    let context = {
      pokemon: queryResult.rows
    };

    response.send(context);
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in ~~~'));
