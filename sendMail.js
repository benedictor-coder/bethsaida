'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

let app = express();

const host = 'localhost://';
const port = 3000;

let database = 'mongodb://localhost:27017/Client_Mails_Database';

app.get('/', function(req, res) {
  res.set({
    'Access-Control-Origin' : '*'
  });
}).listen(port);

console.log('Server listening on:' + host + port + ' ' + 'for successful connection.');

app.use('/', express.static(path.join(__dirname + '/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/sendClientEmails', function(req, res) {
  let enterName = req.body.enter_name;
  let enterEmail = req.body.enter_email;
  let enterPhoneNumber = req.body.enter_phone_number;
  let enterSubect = req.body.enter_subject;
  let emailText = req.body.email_body_text;

  let emailData = {
    "clientName": enterName,
    "clientEmail": enterEmail,
    "clientPhoneNumber": enterPhoneNumber,
    "clientSubject": enterSubect,
    "clientEmail": emailText
  }

  const send_clientEmails_to_database = (db, callback) => {
    const collection = db.collection('Client_Emails');

    collection.insertOne(emailData, (err, result) => {
      if(err)
      return process.exit(1);
      callback(result);
    });
  };

  MongoClient.connect(database, {useNewUrlParser: true}, function(error, client){
    if(error){
    throw error;
  }

  console.log('A connection to the database has been established successfully.');

  const db = client.db('Client_Mails_Database');
  send_clientEmails_to_database(db, () => {
    console.log('New email from the client has been recorded to the database.');
  });
});

res.set({
  'Access-Control-origin' : '*'
});
return res.redirect('contact.html');
});


// module.exports.sendMail = sendMail.js;
