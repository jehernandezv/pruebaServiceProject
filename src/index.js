require('dotenv').config();
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary');
const fs = require('fs');
const uuid = require('uuid').v4;

//require('./database');
//const Patient = require('./models/Patient');

var port = process.argv[2];
var numServer = process.argv[3];
var app = express();
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/uploads'),
    filename:(req,file,cb) => {
        cb(null,uuid()+path.extname(file.originalname))
    }
});


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({storage}).single('image'));
app.use(bodyParser.json());
cloudinary.config({
    cloud_name: 'drh8926tv',
    api_key: '296114521285185',
    api_secret: 'qBb8TnYd7X9f7LdnyEbXjs5SqMs'
});

app.get('/',function(req,res){
    res.json({
        message:'el server: ' + numServer + ' respondio'
    })
});

//traer todos los casos mostrar grafica
app.get('/all',function(req,res){
    res.json({
        message:'traer todos los casos registrados de cache'
    })
});

//reporte por cuidad en PDF
app.get('/:city',function(req,res){
    console.log(req.params.city);
    res.json({
        message: 'get de cuidad del server: ' + numServer
    });
});

//registra casos
app.post('/addCovid',async (req,res) => {
    try{
        console.log(req.body.name);
        console.log(req.file.originalname);
        console.log(req.body.city);
       const upload = await cloudinary.v2.uploader.upload(req.file.path);
       console.log(upload);

        /*
        const patient = new Patient({
            name:req.body.name,
            city:req.body.city,
            UrlImage:uuid()
        });*/

       //await patient.save();
       //eliminando imagen del server
        fs.unlinkSync(req.file.path);
        console.log('Se ha guardado un paciente')

        res.json({
            message:'Se ha guardado un paciente'
        })
    }catch(e){
        console.log(e);
        res.json(e.message);
    }
});



app.listen(port, function () {
    console.log('Example app server ubuntu1 listening on port ' + port + '!');
  });