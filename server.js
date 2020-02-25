var express=require ('express');
var bodyParser=require ('body-parser');
var morgan=require ('morgan');
var mangoose=require ('mongoose');
var ejs=require ('ejs');
var engine=require ('ejs-mate');
var fileUpload=require ('express-fileupload');
var app=express();
// mangoose.connect('mongodb://ihebxnachet:zBVG6R1GtL2Pn8Uv@pin-clone-947c9.mongodb.net/test?retryWrites=true&w=majority',(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log('connected DB')
//     }
// },{ useNewUrlParser: true })

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ihebxnachet:zBVG6R1GtL2Pn8Uv@pin-clone-947c9.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });
client.connect(err => {
    if(!err){
        console.log("done")
    }
 
});
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