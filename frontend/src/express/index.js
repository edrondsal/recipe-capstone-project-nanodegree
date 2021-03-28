/*--------------------------------------------------------
Server code for Capstone UDACITY Project - Cloud Developper Nanodegree
version: 1.0.0
created on: 02/06/20
last modified: 11/06/20
Updates:
02/06/20    File Creation
02/06/20    Configuration Server
02/06/20    Set API
11/05/20    Correction after review
author: E. RONDON
----------------------------------------------------------*/
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv');

const port = 3000;
let appClassifyCacheData = {};
let appSentimentCacheData = {};
let internalServerError = {
  code: 500,
  message: 'Internal Server Error'
}

// Start up an instance of app
const app = express();

//Configuration of express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Configuration of express to use  Cors for cross origin allowance
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
const server = app.listen(port,listening);



/**
 * @description Function working as the callback of the listen function used to create the server
 * @since      0.0.1
 * @access     private
*/
function listening(){
    console.log(`server running in localhost:${port}`);
}

