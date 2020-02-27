



module.exports=(app)=>{
    app.get('/',(req,res,next)=>{
        res.render('pins/index')
        })
        
            
                app.get('/Shop',(req,res,next)=>{
                    res.render('pins/shop')
                    })
                    app.get('/Profile',(req,res,next)=>{
                        res.render('pins/profile')
                        })
                      
}