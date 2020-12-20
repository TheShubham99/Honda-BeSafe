const http = require('http')
const fs = require('fs')
const express = require('express')
var path = require('path');
const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyQMQW52TXceWFk5'
});
var base = Airtable.base('appaMvw4sxN3BYSvg');


app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'public/index.html'));
});

app.get('/load',function(req,res){
    var name,ph,id,lon,lat,car;
   
  
  base('Honda BeSafe').select({
    view: 'Grid view'
}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
        name=records[0].get('Name').toString();
        car=records[0].get('Car').toString();
        ph=records[0].get('Phone').toString();
        lat=records[0].get('lat').toString();
        lon=records[0].get('lon').toString()
        id=records[0].get('id').toString()
       
        
        res.send({"name":name,"car":car,"phone":ph,"lat":lat,"lon":lon,"id":id});
});
})


app.get('/update',function(req,res){
    var phone;
    phone=req.param('ph');

    console.log(phone);
    base('Honda BeSafe').update([
        {
          "id": "recRaoNfvw9zNnHG9",
          "fields": {
            "Phone":"+"+phone 
        }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        
})
})


app.listen(process.env.PORT || 3000)

