var express=require ('express');
var bodyParser=require ('body-parser');
var morgan=require ('morgan');
var mangoose=require ('mongoose');
var ejs=require ('ejs');
var engine=require ('ejs-mate');
var fileUpload=require ('express-fileupload');
var app=express();
const firebase = require('firebase');

var config = {
    apiKey: "AIzaSyAx3B8qG92X5XrJCNAj9niPXALcgc8ZVDU",
    authDomain: "pin-clone.firebaseapp.com",
    databaseURL: "https://pin-clone.firebaseio.com/",
    storageBucket: "pin-clone.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

app.use(fileUpload());
app.use(express.static(__dirname+'/public'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true   
}))
app.use(morgan("dev"))


require('./routes/main')(app);
require('./routes/pins')(app);
app.listen(8080,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('connected on port 8080')
    }
})