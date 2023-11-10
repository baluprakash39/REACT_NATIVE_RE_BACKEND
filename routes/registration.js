const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');
const RegisteredPhoneNumber = require('../Models/registrationschema'); 
// const logger = require('../logger');
const mongoose = require('mongoose');

//logging in
  router.get('/checkPhoneNumberAndDevice', async (req, res) => {
   
    try {
      console.log('API:', req.checkPhoneNumberAndDevice); 
      const { phoneNumber, deviceId } = req.query;
       
      if (!phoneNumber || !deviceId) {
        return res.status(400).json({ message: 'Phone number and deviceId are required in the query parameters.' });
      }
  
      RegisteredPhoneNumber.findOne({ phoneNumber, deviceId })
      
        .then((result) => {
          console.log(result.role);
          // const token = jwtMiddleware.generateToken(phoneNumber,result.role);
          const token = jwtMiddleware.generateToken(phoneNumber);
         console.log(token)
        //  const refreshToken = jwtMiddleware.generateRefreshToken(phoneNumber,result.role);
      const refreshToken = jwtMiddleware.generateRefreshToken(phoneNumber);
          console.log(refreshToken)
          if (result) {
            res.json({ success: true, status: 'allowed',data:result,  token, refreshToken });
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
  
//restering admin
  router.post('/registerPhoneNumber', async (req, res) => {
    const { phoneNumber, name, email, companyname, brandname, deviceId, role } = req.body;
  
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required in the request body.' });
    }
  
    // Check if a record with the same phone number and device ID already exists
    const existingPhoneNumber = await RegisteredPhoneNumber.findOne({ phoneNumber, deviceId });
  
    if (existingPhoneNumber) {
      // A record with the same phone number and device ID already exists
      return res.status(400).json({ message: 'Phone number is already registered.',status:'fail' });
    }
  
    // new record creation
    const registeredPhoneNumber = new RegisteredPhoneNumber({
      phoneNumber,
      name,
      email,
      companyname,
      brandname,
      deviceId,
      role,
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
//get all admins
router.get('/getAllRegisteredPhoneNumbers', async (req, res) => {
  try {
    const allRegisteredPhoneNumbers = await RegisteredPhoneNumber.find();
    
    if (allRegisteredPhoneNumbers.length === 0) {
      return res.status(404).json({ message: 'No phone numbers registered yet', status: 'fail' });
    }

    res.json({
      message: 'All registered phone numbers retrieved successfully',
      data: allRegisteredPhoneNumbers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', status: 'error' });
  }
});
// router.get('/getAllRegisteredAdmins', async (req, res) => {
  
//   try {
//     // Fetch all registered phone numbers with the role 'admin'
//     const allRegisteredAdmins = await RegisteredPhoneNumber.find();
//     console.log('admins',allRegisteredAdmins)
//   const filteredData = allRegisteredAdmins.filter(data=>{
//     return data.role == 'admin'
//   })
//     console.log('filter',filteredData )
//     if (filteredData.length === 0) {
//       return res.status(404).json({ message: 'No admins registered yet', status: 'fail' });
//     }

//     res.json({
//       message: 'All registered admins retrieved successfully',
//       data: filteredData,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error', status: 'error' });
//   }
// });



//phone number
  router.post('/getsignup', (req, res, next)=>{

       
    var mobileNo=req.body.phoneNumber;
    console.log(mobileNo)

     RegisteredPhoneNumber.findOne({phoneNumber:mobileNo}).select().exec().then( doc => {
     var user  = req.body.phoneNumber;
     if(doc == null || doc == undefined || doc ==''){
       res.status(400).json({ 
           Authentication: 'User not exist',
           message:'failed', 
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
 //phone number device id
 router.get('/check', async (req, res) => {
  try {
    const { phoneNumber, deviceId } = req.query;

    if (!phoneNumber || !deviceId) {
      return res.status(400).json({ message: 'Phone number and deviceId are required in the query parameters.' });
    }

    RegisteredPhoneNumber.findOne({ phoneNumber, deviceId })
    
      .then((result) => {
        const token = jwtMiddleware.generateToken(phoneNumber);
       console.log(token)
    const refreshToken = jwtMiddleware.generateRefreshToken(phoneNumber);
        console.log(refreshToken)
        if (result) {
          res.json({ success: true, status: 'allowed',data:result,  token, refreshToken });
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
//refresh token
 router.post('/refresh-token', (req, res) => {
  const refreshTokenValue = req.body.refreshToken;

  // Verify the refresh token
  jwtMiddleware.refreshToken(req, res);
});
//delete admins
router.delete('/deleteRegisteredPhoneNumber/:phoneNumberId', async (req, res) => {
  try {
    const phoneNumberId = req.params.phoneNumberId;

    // Check if the phone number exists
    const phoneNumberToDelete = await RegisteredPhoneNumber.findById(phoneNumberId);
    if (!phoneNumberToDelete) {
      return res.status(404).json({ message: 'Phone number not found', status: 'fail' });
    }

    // Delete the phone number
    await RegisteredPhoneNumber.findByIdAndDelete(phoneNumberId);

    res.json({ message: 'Phone number deleted successfully', status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', status: 'error' });
  }
});



module.exports = router;