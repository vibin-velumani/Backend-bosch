const mongoose=require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
})
const con=mongoose.connection
con.on('error',function(){
    console.log("Error");
})
con.on('open',function(){
    console.log("Connected");
})
module.exports=con;