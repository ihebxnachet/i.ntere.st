
var path=require('path')
var Pin=require("../models/pins")
const firebase = require('firebase');
function writeUserData(pins) {
    firebase.database().ref('pin/' + pins.imageUrl).set({
      title: pins.Title,
      desc:pins.Desc,
      createdBy : pins.Username,
      imageUrl:pins.imageUrl,
      path:pins.path
    });
  }
module.exports=(app)=>{
    app.route('/Create')
    .get((req,res,next)=>{
        res.render('pins/create')})
        .post((req,res,next)=>{
            var pins= new Object();
            pins.Title=req.body.Title
            pins.Desc=req.body.Desc
            pins.Username=req.body.Username
            pins.isSave=false
            if(!req.files){
                return JSON('error')
            }
            let sampleFile=req.files.sampleFile
            let fileTitle=Math.random().toString(26).slice(2)
            let fileName=fileTitle+'.jpg'
            let path='./public/Files/'+fileName
            pins.imageUrl=fileTitle
            pins.path='/Files/'+fileName
            sampleFile.mv(path,(err)=>{
                if(err)return res.status(500).send(err)

            })
            writeUserData(pins)
            res.redirect("/pins/My-pins")
        })
     app.get('/pins/index',(req,res,pins)=>{
               
                })
                app.get('/pins/My-pins',(req,res,pins)=>{
                    
                    const db = firebase.database();
                    //var node=[]
                    function snapshotToArray(snapshot) {
                      var returnArr = [];
                  
                      snapshot.forEach(function(childSnapshot) {
                          var item = childSnapshot.val();
                          item.key = childSnapshot.key;
                  
                          returnArr.push(item);
                      });
                  res.render('pins/myPins',{pins:returnArr})

                      return returnArr;
                  };
                  db.ref("/pin").on('value', function(snapshot) {
                    snapshotToArray(snapshot);
                });
                    
                  
                  

                                        })
}