const express = require('express')
const app = express()
const todos = require('./routes/todos')
let port = process.argv[2] || 2223

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID
const uri = "mongodb+srv://username:G4Mohki8@cluster0-oxiar.mongodb.net/myservernode?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
const nomeDatabase = "myservernode"
const nomeCollection = "listaFilm"

client.connect((err) => 
{
  if(err)
  {
    console.log('Error occurred while connecting to MongoDB Atlas...\n', err)
  }
  console.log('Connected...')

  //Read
  client.db(nomeDatabase).collection(nomeCollection).find().toArray(function (err, result) {
    if (err) throw err
    {
      const todos = result
      console.log(todos)
    }
  });

  //Update
  client.db(nomeDatabase).collection(nomeCollection, function (err, collection) {

    const newOne = { titolo: 'Maya', descrizione: 'Film'};

    collection.updateOne({_id:ObjectId("5cde667e1c9d44000051e373")}, { $set: newOne },
    function(err, result) {
      if (err) throw err
      {
        console.log('Document updated successfully');
      }
    });
  });

  //Delete
  client.db(nomeDatabase).collection(nomeCollection).
  deleteOne({_id:ObjectId("5cde667e1c9d44000051e373")}, {w:1}, function(err, result) {
    if(err) throw err
    {
      console.log('Document removed successfully')
    }
  });

  //perform action on the collection oject
  client.close();
});

app.use(express.urlencoded({extended: false}))

const myLogger = function (req, res, next)
                 {
                    console.log('Loggato');
                    next();
                 };

app.use(myLogger)
app.use('/api/v1/todos', todos)

app.use
(
  function(req, res)
  {
    res.status(404).send('What??? Error 404')
  }
);

app.post
(
  '/api/v1/todos',
  function(req, res)
  {
    const listaOggetti = 'listaOggetti.js'
    fs.readFile
    (
      listaOggetti,
      function(e, data) 
      {
        // 500 Internal Server Error
        if (e)
        {
          return res.sendStatus(500)
        }

        try 
        {
          users = JSON.parse(data)
        }
        catch (e) 
        {
          res.sendStatus(500)
        }

        res.json(todos)
      })
})

app.listen(port)