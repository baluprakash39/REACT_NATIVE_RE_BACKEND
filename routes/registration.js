const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');
const AWS = require('aws-sdk');
const RegisteredPhoneNumber = require('../Models/registrationschema'); 
// const logger = require('../logger');
const mongoose = require('mongoose');

AWS.config.update ({
  accessKeyId: 'AKIA4NZVQN5SIJCFS36Y',
  secretAccessKey: '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',
  // region: 'us-east-2',
});

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
  const { phoneNumber, name, email, companyname, brandname, currentdate, gst, address, streetname, pincode, city, state, country, website, deviceId, role, image } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required in the request body.' });
  }

  // Check if a record with the same phone number and device ID already exists
  const existingPhoneNumber = await RegisteredPhoneNumber.findOne({ phoneNumber, deviceId });

  if (existingPhoneNumber) {
    // A record with the same phone number and device ID already exists
    return res.status(400).json({ message: 'Phone number is already registered.',status:'fail' });
  }

  // Check if image data exists in the request
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No image uploaded.' });
  }

  // Assuming the image field in the request is 'image'
  const file = req.files.image;

  const s3 = new AWS.S3();
  const bucketName = 'motoq';
  const timestamp = Date.now(); // Generate a timestamp
  const key = `images/${timestamp}-${file.name}`;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file.data,
    ACL: "public-read",
  };

  // Uploading image to S3
  s3.upload(params, async (err, data) => {
    if (err) {
      console.error('Error uploading image to S3:', err);
      return res.status(500).json({ message: 'Error uploading image.' });
    }

    // Image uploaded successfully, now proceed with user registration
    const image = data.Location; // Retrieve image URL

    // Create a new record including the image path
    const registeredPhoneNumber = new RegisteredPhoneNumber({
      phoneNumber,
      name,
      email,
      companyname,
      currentdate,
      brandname,
      gst,
      address,
      streetname,
      pincode,
      city,
      state,
      country,
      website,
      deviceId,
      role,
      image, // Include the image path in the model
    });

    try {
      const savedPhoneNumber = await registeredPhoneNumber.save();
      res.status(200).json({
        message: 'Phone number registered successfully with image',
        data: savedPhoneNumber,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
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

// Update accept status endpoint
router.put('/updateAcceptStatus/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const updatedPhoneNumber = await RegisteredPhoneNumber.findByIdAndUpdate(
      id,
      { adminaccept: req.body.adminaccept },
      { new: true }
    );

    res.json(updatedPhoneNumber);
  } catch (error) {
    console.error('Error updating accept status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/updateadmin/:id', async (req, res) => {
  console.log(req.body)
  try {
    await RegisteredPhoneNumber.findByIdAndUpdate(req.params.id, req.body);
    res.json('Admin details updated successfully',

    );
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error: ${error}`);
  }
});

//update adminimage
router.put('/updateImage/:id', async (req, res) => {
  const id = req.params.id;

  // Check if image data exists in the request
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No image uploaded.' });
  }

  // Assuming the image field in the request is 'image'
  const file = req.files.image;

  const s3 = new AWS.S3();
  const bucketName = 'motoq';
  const timestamp = Date.now(); // Generate a timestamp
  const key = `images/${timestamp}-${file.name}`;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file.data,
    ACL: 'public-read',
  };

  // Uploading image to S3
  s3.upload(params, async (err, data) => {
    if (err) {
      console.error('Error uploading image to S3:', err);
      return res.status(500).json({ message: 'Error uploading image.' });
    }

    const updatedImage = data.Location; // Retrieve the updated image URL

    try {
      // Find the record by ID and update the image field
      const updatedPhoneNumber = await RegisteredPhoneNumber.findByIdAndUpdate(
        id,
        { image: updatedImage }, // Update the image field with the new image URL
        { new: true } // To return the updated record
      );

      if (!updatedPhoneNumber) {
        return res.status(404).json({ message: 'Phone number not found.' });
      }

      res.status(200).json({
        message: 'Image updated successfully for the phone number',
        data: updatedPhoneNumber,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
});



router.get('/getadminid/:id', async (req, res) => {
  try {
    // Find the record by ID
    const phoneNumber = await RegisteredPhoneNumber.findById(req.params.id);

    if (!phoneNumber) {
      // If the record with the provided ID is not found
      return res.status(404).json({ message: 'Phone number not found.', status: 'fail' });
    }

    // Respond with the found record
    res.json({
      message: 'Phone number retrieved successfully',
      data: phoneNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/getphonenumber/:phoneNumber', async (req, res) => {
  try {
    // Find the record by phone number
    const phoneNumberDetails = await RegisteredPhoneNumber.findOne({ phoneNumber: req.params.phoneNumber });

    if (!phoneNumberDetails) {
      // If the record with the provided phone number is not found
      return res.status(404).json({ message: 'Phone number details not found.', status: 'fail' });
    }

    // Respond with the found record
    res.json({
      message: 'Phone number details retrieved successfully',
      data: phoneNumberDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;