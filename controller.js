const Model = require('./model');

async function findUrl(original_url){
    return new Promise((resolve, reject)=>{
        Model.find({original_url: original_url})
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(e=>{
            reject(e);
        })
    });
    
}

async function addUrl(original_url, short_url){
    return new Promise((resolve, reject)=>{
        const model=new Model({
            original_url,
            short_url
        });
        
        model.save()
        .then(data=>{
            resolve(data);
        })
        .catch(err=>{
            reject(err);
        });
    }); 
}

module.exports={
    findUrl,
    addUrl
}