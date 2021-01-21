'use strict'
//importing modules to use in the app
var express = require('express');
var bodyParser = require ('body-parser');
var path  = require('path');
var MongoClient = require('mongodb').MongoClient;

var sendMail = require('./sendMail.js');

//initialize the express app
var app = express();

//localhost and port number
const host = 'localhost://';
const port = 8080;

//create a database(appointments_database) through mongo localhost
var database = 'mongodb://localhost:27017/appointments_database';

//initializing the main route directory for the application
app.get('/', function(req, res) {
    res.set({
        'Access-Control-Origin' : '*'
    });
    return res.redirect('index.html');
}).listen(port);

console.log('Server on' + host + port + " " + "started");

app.use('/', express.static(path.join(__dirname + '/')));//access the root directory containing files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Getting the input values from the form
app.post('/bookAnAppointment', function(req, res) { //routing to the index.html form
var firstName = req.body.firstName;
var lastName = req.body.lastName;
var emailAddress = req.body.emailAddress;
var phoneNumber = req.body.phoneNumber;
var yourAge = req.body.yourAge;
var yourGender = req.body.yourGender;
var yourRegion = req.body.yourRegion;

//declare an object for the input data
var data = {
    "firstName": firstName,
    "lastName": lastName,
    "emailAddress": emailAddress,
    "phoneNumber": phoneNumber,
    "yourAge":yourAge,
    "yourGender": yourGender,
    "yourRegion": yourRegion
}

//callback for sending data to the database
//create collection(booked_appointments) to store the data on the database
const send_appointment_to_database = (db, callback) => {
    const collection = db.collection('booked_appointments');

    collection.insertOne(data, (err, result) => {
        if(err)
        return process.exit(1);
        callback(result);
    });
};

//connect to the database
MongoClient.connect(database, {useNewUrlParser: true}, function (error, client){
    if(error){
        throw error;
    }

    console.log("Connection to the database is established.");

    const db = client.db('appointments_database');
    send_appointment_to_database(db, () =>{
        console.log("New appointment recorded successfully..");
    });
});
//return to the original page
    res.set({
        'Access-Control-Origin': '*'
    });
    return res.redirect('index.html');
});
