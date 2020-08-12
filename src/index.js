var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const multer = require('multer');
var port = process.argv[2];
var numServer = process.argv[3];

var app = express();
const storage = null;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({storage}).single('image'));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.json({
        message:'el server: ' + numServer + ' respondio'
    })
});

app.get('/:city',function(req,res){
    console.log(req.params.city);
    res.json({
        message: 'get de cuidad del server: ' + numServer
    });
});

app.post('/addCovid', (req,res) => {
    try{
        console.log(req.body.name);
        console.log(req.file.originalname);
        console.log(req.body.city);

        res.json({
            message:'llego post'
        })
    }catch(e){
        console.log(e);
        res.json(e.message);
    }
});



app.listen(port, function () {
    console.log('Example app server ubuntu1 listening on port ' + port + '!');
  });