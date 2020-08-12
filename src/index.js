var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = process.argv[2];
var numServer = process.argv[3];

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.json({
        message:'el server: ' + numServer + ' respondio'
    })
});



app.listen(port, function () {
    console.log('Example app server ubuntu1 listening on port ' + port + '!');
  });