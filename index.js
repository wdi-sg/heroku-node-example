const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests
require('./routes')(app, db);

app.get('/dinosaur', (request, response) => {
    response.send("WORKSSSSSSSSS BANANA")
});

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
  let loggedIn = request.cookies['loggedIn'];
  let username = request.cookies['username'];

  db.queryInterface('SELECT * FROM pokemon', (error, queryResult) => {
    if (error) console.error('error!', error);

    let context = {
      loggedIn: loggedIn,
      username: username,
      pokemon: queryResult.rows
    };

    response.render('Home', context);
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
