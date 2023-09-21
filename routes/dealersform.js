const express = require('express');
const router = express.Router();

const FormData = require('../Models/Dealersschema'); 

  router.post('/dealerdetails', async (req, res) => {
    try {
      const {
        companyname,
        companyaddress,
        streetname,
        city,
        pincode,
        state,
        country,
        contactnumber,
        emailid,
        website,
        // adminallimages
        // image
      } = req.body;
  
      const formData = {
        companyname,
        companyaddress,
        streetname,
        city,
        pincode,
        state,
        country,
        contactnumber,
        emailid,
        website,
        // adminallimages
        // image
      };
  
      const createdForm = await FormData.create(formData);
      res.status(201).json(createdForm);
    } catch (error) {
      console.error('Error creating form:', error);
      res.status(500).json({ message: 'Error creating form' });
    }
  });
  router.get('/getdealers', async (req, res) => {  

    try {
        const user = await FormData.find({})
        
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

module.exports = router;