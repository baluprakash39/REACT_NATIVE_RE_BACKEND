const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerda = require('./routes/formfeilds');
const router = require('./routes/quotationform');
const fileUpload = require('express-fileupload');
const Multi = require("./routes/multipleimages");
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
app.use('/uploadquotation', router);

module.exports = app;
