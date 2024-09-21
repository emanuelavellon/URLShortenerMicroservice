const mongoose=require('mongoose');


async function dbConnect(url){
    try{
       await mongoose.connect(url);
       console.log("db conectada con exito");
    }catch(e){
        console.error("There was a problem in database conection", stateConection);
    }
    
}

module.exports={
    dbConnect
}