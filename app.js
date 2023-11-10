const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerda = require('./routes/formfeilds');
const router = require('./routes/quotationform');
const routerv = require('./routes/sections');
const fileUpload = require('express-fileupload');
const Multi = require("./routes/multipleimages");
const routers = require("./routes/singleimage");
const routerd = require('./routes/dealersform');
const routerr = require('./routes/registration');
const routeruser = require('./routes/usersregistration')
// const routerc = require('./routes/careform');
const url = 'mongodb+srv://Roshan:Roshan786@cluster0.eoiy197.mongodb.net/test?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 
app.use(fileUpload());

app.use('/formdetails', routerda);
app.use('/upload',Multi);
app.use('/upload', routers);
app.use('/uploadquotation', router);
app.use('/bikes',routerv);
app.use('/dealerdetails',routerd);
app.use('/registerPhoneNumber',routerr);
app.use('./registerUser', routeruser)
// app.use('/uploadcare', routerc);

module.exports = app;
