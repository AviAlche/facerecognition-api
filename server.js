const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');
const profile = require('./controllers/profile.js');

var knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '85ms3t',
      database : 'facerecognition'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{ res.send('db is running'); });

app.post('/signin', (req,res) => { signin.signinHandler(req,res,db,bcrypt) });

app.post('/register', (req,res) => { register.handleRegister(req,res,db,bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req,res,db) });

app.put('/image', (req, res) =>{ image.handleImage(req,res,db) });

app.post('/imageurl', (req, res) =>{ image.handleApiCall(req,res) });

app.listen(3000, () => {
    console.log("app is running on port 3000");
});
