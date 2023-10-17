const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');

const RegisteredPhoneNumber = require('../Models/registrationschema'); 

  // GET endpoint to retrieve all registered phone numbers based on a specific phone number query parameter
  // router.get('/allRegisteredPhoneNumbers', async (req, res) => {
  //   try {
  //     const { phoneNumber, deviceId } = req.query;
  
  //     if (!phoneNumber || !deviceId) {
  //       return res.status(400).json({ message: 'Phone number and deviceId are required in the query parameters.' });
  //     }
  
  //     const registeredPhoneNumbers = await RegisteredPhoneNumber.find({ phoneNumber, deviceId });
  
  //     if (registeredPhoneNumbers.length > 0) {
  //       // Create an array of objects with phoneNumber and deviceId
  //       const phoneNumbers = registeredPhoneNumbers.map((entry) => ({ phoneNumber: entry.phoneNumber, deviceId: entry.deviceId }));
  //       res.json({ success: true, phoneNumbers });
  //     } else {
  //       res.json({ success: false, message: 'Phone number not found' });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // });
  router.get('/checkPhoneNumberAndDevice', async (req, res) => {
    try {
      const { phoneNumber, deviceId } = req.query;
  
      if (!phoneNumber || !deviceId) {
        return res.status(400).json({ message: 'Phone number and deviceId are required in the query parameters.' });
      }
  
      RegisteredPhoneNumber.findOne({ phoneNumber, deviceId })
        .then((result) => {
          const token = jwtMiddleware.generateToken(phoneNumber);
          const refreshToken = jwtMiddleware.generateRefreshToken(phoneNumber);
          if (result) {
            res.json({ success: true, status: 'allowed',data:result, token, refreshToken });
          } else {
            res.json({ success: false, status: 'not allowed' });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // POST endpoint to register a new phone numberw
  router.post('/registerPhoneNumber', async (req, res) => {
    const { phoneNumber, name, email, companyname, deviceId } = req.body;
  
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required in the request body.' });
    }
  
    // Check if a record with the same phone number and device ID already exists
    const existingPhoneNumber = await RegisteredPhoneNumber.findOne({ phoneNumber, deviceId });
  
    if (existingPhoneNumber) {
      // A record with the same phone number and device ID already exists
      return res.status(400).json({ message: 'Phone number is already registered.' });
    }
  
    // new record creation
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
  
 router.post('/getsignup', (req, res, next)=>{

       
    var mobileNo=req.body.phoneNumber;
     console.log(mobileNo)

     RegisteredPhoneNumber.findOne({phoneNumber:mobileNo}).select().exec().then( doc => {
     var user  = req.body.phoneNumber;
     if(doc == null || doc == undefined || doc ==''){
       res.status(400).json({ 
           Authentication: 'User not exist',
           message:'failed'
       })
     }
   
     else if(user == doc.phoneNumber){
       res.status(200).json({Authentication: doc._id,
                              message: "Success",
                              adminaccept:doc.adminaccept,
                             userProfile:doc,
                           })
     }
     else
     { 
         res.status(400).json({ 
             Authentication: 'Failed to login ',
             message:'error'
                             });
 
     }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
 
 
 });
 
 router.post('/refresh-token', (req, res) => {
  const refreshTokenValue = req.body.refreshToken;

  // Verify the refresh token
  jwtMiddleware.refreshToken(req, res);
});

module.exports = router;