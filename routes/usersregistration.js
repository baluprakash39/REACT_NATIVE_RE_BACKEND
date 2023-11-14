const express = require('express');
const router = express.Router();
// const jwtMiddleware = require('../jwtMiddleware');
const RegisteredUser = require('../Models/registrationschema'); 
const RegisteredPhoneNumber = require('../Models/registrationschema'); // Add this line
const logger = require('../logger');


router.post('/registerUser', async (req, res) => {
  const { name, phoneNumber, companyname, role, currentdate, deviceId, adminaccept } = req.body;

  try {
    // Check if a record with the same user contact number already exists
    const existingUser = await RegisteredUser.findOne({ phoneNumber });

    if (existingUser) {
      // A record with the same user contact number already exists
      return res.status(400).json({ message: 'User with the provided contact number is already registered.', status: 'fail' });
    }
    
     
     // Find the admin record for the specified company
     const adminRecord = await RegisteredPhoneNumber.findOne({ companyname, role: 'admin', adminaccept: true });

     if (!adminRecord) {
       return res.status(404).json({ message: 'Admin not found for the specified company and role.', status: 'fail' });
     }
 
     // Get the current user count
     const currentUserCount = await RegisteredUser.countDocuments({ companyname, role: 'user' });
 
     // Get the available user count based on the updated count
     const availableCount = adminRecord.count - currentUserCount;
 
     if (availableCount <= 0) {
       return res.status(400).json({ message: 'User limit reached for the specified company.', status: 'fail' });
     }

    // Create a new user record
    const registeredUser = new RegisteredUser({
      name,
      phoneNumber,
      companyname,
      role,
      currentdate,
      deviceId,
      adminaccept,
    });

    const savedUser = await registeredUser.save();
    
    res.json({
      message: 'User registered successfully',
      data: savedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', status: 'error' });
  }
});
router.get('/checkCompanyNameAndRole', async (req, res) => {
  try {
    const { companyname, role } = req.query;

    if (!companyname || !role) {
      return res.status(400).json({ message: 'Company name and role are required in the query parameters.' });
    }

    const adminRecord = await RegisteredPhoneNumber.findOne({ companyname: companyname, role: role });

    if (adminRecord) {
      const usersWithSameCompanyAndRole = await RegisteredUser.find({ companyname: companyname, role: role });

      res.json({
        success: true,
        status: 'allowed',
        adminData: adminRecord,
        users: usersWithSameCompanyAndRole,
      });
    } else {
      res.json({ success: false, status: 'not allowed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;