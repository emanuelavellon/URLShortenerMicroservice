const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const urlSchema=new Schema({
    original_url: {
        type: String,
        require: true
    },
    short_url: {
        type: String,
        require: true
    }
});

const Model=mongoose.model("UrlShortener", urlSchema);

module.exports=Model;