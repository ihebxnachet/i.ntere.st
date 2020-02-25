
var path=require('path')
var Pin=require("../models/pins")

module.exports=(app)=>{
    app.route('/Create')
    .get((req,res,next)=>{
        res.render('pins/create')})
        .post((req,res,next)=>{
            var pins=new Pin()
            pins.Title=req.body.Title
            pins.Desc=req.body.Desc
            pins.Username=req.body.Username
            pins.isSave=false
            if(!req.files){
                return JSON('error')
            }
            let sampleFile=req.files.sampleFile
            let fileName=Math.random().toString(26).slice(2)+'.jpg'
            let path='./public/Files/'+fileName
            pins.Path='/Files'+fileName
            sampleFile.mv(path,(err)=>{
                if(err)return res.status(500).send(err)

            })
            pins.save(function (err) {
                if (err) return handleError(err);
                res.redirect("/pins/index")
              })
            })
     app.get('/pins/index',(req,res,pins)=>{
                res.render('pins/index',{pins:pins})
                })
}