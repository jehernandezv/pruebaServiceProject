const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projectFinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is conected')).catch(err => console.log(err));