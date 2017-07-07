var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require( 'path' );
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

var pg = require('pg');

var config = {
  database: 'antares', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time?
  idleTimeoutMillis: 30000 // 30 second time out
};

var pool = new pg.Pool(config);

// Sending koala DB data back to server
app.get('/koalas', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "koalas" ORDER BY "id" ASC;';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.send({koalas: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET

// Adding new koala data to the DB
app.post('/koalas', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var koala = req.body;
      // console.log(koala);
      var name = koala.name;
      var age = koala.age;
      var gender = koala.gender.toUpperCase();
      var readyForTransfer = koala.readyForTransfer.toUpperCase();
      var notes = koala.notes;
      var queryText = 'INSERT INTO "koalas" ' +
          '("name", "age", "gender","ready_for_transfer", "notes") ' +
          'VALUES ($1, $2, $3, $4, $5);';
      db.query(queryText,[name, age, gender, readyForTransfer, notes], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.send({koalas: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET

// Serve back static files by default
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
