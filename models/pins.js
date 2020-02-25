const mangoose=require('mongoose');
const schema=mangoose.Schema;
const Pinschema=new schema({
    Title:String,
    Desc:String,
    Username:String,
    Path:String,
    isSave:Boolean,
})
module.exports=mangoose.model('Pin',Pinschema)