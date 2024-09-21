require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser=require("body-parser");
const db = require('./database');
const controller = require('./controller');
const { find } = require('./model');
const uniqueId = require('short-unique-id');

// Basic Configuration
const port = process.env.PORT || 3000;

// Body Parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// UniqueId configuration
const uid = new uniqueId({ length: 4 });

db.dbConnect(process.env.MONGO_URI);

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// FreeCodeCamp Challenge
app.post('/api/shorturl', async function(req, res){
   const longUrl = req.body.url;
   if(!longUrl) return;

   const response = {
    original_url: "",
    short_url: ""
   };

   const findedUrl = await controller.findExistingUrl(longUrl);

   if(findedUrl.length===0){
    const shortUrl=uid.randomUUID();
    const newUrl = await controller.addUrl(longUrl, shortUrl);
    response.original_url = newUrl.original_url;//hacer desestrucutracion que aplaste
    response.short_url = newUrl.short_url;
   }else{
    response.original_url = findedUrl[0].original_url;
    response.short_url = findedUrl[0].short_url;

   }

   res.json(response);
});

app.get('/api/shorturl/:id', async function(req, res){
    const id = req.params.id;
    if(!id) return;

    console.log(id);

    const result = await controller.findId(id);

    console.log(result);
    
    
    res.redirect(result[0].original_url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
