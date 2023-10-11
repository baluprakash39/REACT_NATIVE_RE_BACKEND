const express = require('express');
const router = express.Router();

const RegisteredPhoneNumber = require('../Models/registrationschema'); 

  // GET endpoint to retrieve all registered phone numbers based on a specific phone number query parameter
  router.get('/allRegisteredPhoneNumbers', async (req, res) => {
    try {
      const { phoneNumber, deviceId } = req.query;
  
      if (!phoneNumber || !deviceId) {
        return res.status(400).json({ message: 'Phone number and deviceId are required in the query parameters.' });
      }
  
      const registeredPhoneNumbers = await RegisteredPhoneNumber.find({ phoneNumber, deviceId });
  
      if (registeredPhoneNumbers.length > 0) {
        // Create an array of objects with phoneNumber and deviceId
        const phoneNumbers = registeredPhoneNumbers.map((entry) => ({ phoneNumber: entry.phoneNumber, deviceId: entry.deviceId }));
        res.json({ success: true, phoneNumbers });
      } else {
        res.json({ success: false, message: 'Phone number not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // POST endpoint to register a new phone number
  router.post('/registerPhoneNumber', (req, res) => {
    const { phoneNumber, name, email, companyname, deviceId } = req.body;
  
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required in the request body.' });
    }
  
    // Create a new instance of RegisteredPhoneNumber with all the fields
    const registeredPhoneNumber = new RegisteredPhoneNumber({
      phoneNumber,
      name,
      email,
      companyname,
      deviceId
    });
  
    registeredPhoneNumber.save()
      .then(savedPhoneNumber => {
        // Include the registeredPhoneNumber details in the response
        res.json({
          message: 'Phone number registered successfully',
          data: savedPhoneNumber,
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
  

module.exports = router;