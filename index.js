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
      database: 'sei20',
      port: 5432
  };
}

const pool = new pg.Pool(configs);

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));




// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.get('/cats', (request, response) => {
  response.send('WOW CATS')
});


app.get('/banana', (request, response) => {
  response.render('banana')
});

app.post('/save', (request, response) => {
  const values = [request.body.name];
  pool.query('INSERT INTO products (name) VALUES ($1) RETURNING *',values, (error, queryResult) => {
    if (error) console.error('error!', error);

    response.send(queryResult.rows);

  });
});


app.get('/apple', (request, response) => {

  let query = "SELECT * FROM products WHERE name='"+request.query.id+"'";
  query = "SELECT * FROM products WHERE name=$1";


  console.log("QUERY");
  console.log( query );

  const values = [request.query.id]

  pool.query(query,values, (error, queryResult) => {
    if (error) console.error('error!', error);

    console.log( "DB RESULT" );
    console.log( queryResult.rows );

    response.send(queryResult.rows);
  });
});







// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {

  pool.query('SELECT * FROM products', (error, queryResult) => {
    if (error) console.error('error!', error);

    console.log( "DB RESULT" );
    console.log( queryResult.rows );
    const lastItem = queryResult.rows[ queryResult.rows.length-1 ];

    let my_response = "<html>";

    my_response = my_response + "<body>";
    my_response = my_response + "<h1>HEY HTML</h1>";
    my_response = my_response + "<h3>name "+lastItem.name+"</h3>";
    my_response = my_response + "</body>";
    my_response = my_response + "</html>";

    // response.send(my_response);
    const data = {
      name : lastItem.name
    }
    response.render('root',data);
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in ~~~'));