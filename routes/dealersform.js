const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');

const FormData = require('../Models/Dealersschema'); 

router.post('/dealerdetails', jwtMiddleware.verifyToken, async (req, res) => {
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
      gstin,
      dealeremailid,
      website,
    } = req.body;

    // Check if any dealer details exist in the database
    const existingFormData = await FormData.findOne();

    if (existingFormData) {
      // If dealer details exist, update them
      existingFormData.companyname = companyname;
      existingFormData.companyaddress = companyaddress;
      existingFormData.streetname = streetname;
      existingFormData.city = city;
      existingFormData.pincode = pincode;
      existingFormData.state = state;
      existingFormData.country = country;
      existingFormData.contactnumber = contactnumber;
      existingFormData.dealeremailid = dealeremailid;
      existingFormData.website = website;

      const updatedForm = await existingFormData.save();
      res.status(200).json(updatedForm);
    } else {
      // If no existing details are found, create a new record
      const newFormData = new FormData({
        companyname,
        companyaddress,
        streetname,
        city,
        pincode,
        state,
        country,
        contactnumber,
        gstin,
        dealeremailid,
        website,
      });

      const createdForm = await newFormData.save();
      res.status(201).json(createdForm);
    }
  } catch (error) {
    console.error('Error creating/updating form:', error);
    res.status(500).json({ message: 'Error creating/updating form' });
  }
});
  router.get('/getdealers', jwtMiddleware.verifyToken, async (req, res) => {  

    try {
        const user = await FormData.find({})
        
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

module.exports = router;