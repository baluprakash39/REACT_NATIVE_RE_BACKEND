const express = require('express');
const router = express.Router();
// const jwtMiddleware = require('../jwtMiddleware');
const RegisteredUser = require('../Models/registrationschema'); 
const RegisteredPhoneNumber = require('../Models/registrationschema'); // Add this line
const logger = require('../logger');


// router.post('/registerUser', async (req, res) => {
//   const { name, phoneNumber, companyname, role, adminphoneNumber, currentdate, deviceId, adminaccept } = req.body;

//   try {
//     // Check if a record with the same user contact number already exists
//     const existingUser = await RegisteredUser.findOne({ phoneNumber });

//     if (existingUser) {
//       // A record with the same user contact number already exists
//       return res.status(400).json({ message: 'User with the provided contact number is already registered.', status: 'fail' });
//     }
    
     
//      // Find the admin record for the specified company
//      const adminRecord = await RegisteredPhoneNumber.findOne({ companyname, role: 'admin', adminaccept: true });

//      if (!adminRecord) {
//        return res.status(404).json({ message: 'Admin not found for the specified company and role.', status: 'fail' });
//      }
 
//      // Get the current user count
//      const currentUserCount = await RegisteredUser.countDocuments({ companyname, role: 'user' });
 
//      // Get the available user count based on the updated count
//      const availableCount = adminRecord.count - currentUserCount;
 
//      if (availableCount <= 0) {
//        return res.status(400).json({ message: 'User limit reached for the specified company.', status: 'fail' });
//      }

//     // Create a new user record
//     const registeredUser = new RegisteredUser({
//       name,
//       phoneNumber,
//       companyname,
//       role,
//       adminphoneNumber,
//       currentdate,
//       deviceId,
//       adminaccept,
//     });

//     const savedUser = await registeredUser.save();
    
//     res.json({
//       message: 'User registered successfully',
//       data: savedUser,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error', status: 'error' });
//   }
// });
// router.get('/checkCompanyNameAndRole', async (req, res) => {
//   try {
//     const { companyname, role } = req.query;

//     if (!companyname || !role) {
//       return res.status(400).json({ message: 'Company name and role are required in the query parameters.' });
//     }

//     // Find an admin for the specified company
//     const adminRecord = await RegisteredPhoneNumber.findOne({ companyname, role: 'admin', adminaccept: true });

//     if (adminRecord) { 
//       // Find all users for the same company name and role 'user'
//       const usersWithSameCompanyAndRole = await RegisteredUser.find({ companyname, role: 'user' });

//       res.json({
//         success: true,
//         status: 'allowed',
//         adminData: adminRecord,
//         users: usersWithSameCompanyAndRole,
//         message: 'Matching users retrieved based on admin company and user role.',
//       });
//     } else {
//       res.json({ success: false, status: 'not allowed', message: 'No matching admin found for the company or invalid role.' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
router.post('/registerUser', async (req, res) => {
  const { name, phoneNumber, companyname, role, adminphoneNumber, currentdate, deviceId, adminaccept } = req.body;

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
      adminphoneNumber,
      currentdate,
      deviceId,
      adminaccept,
    });

    const savedUser = await registeredUser.save();
    
    res.json({
      message: 'User registered successfully',
      data: {
        ...savedUser.toObject(), // Convert the saved user to an object
        adminphoneNumber, // Include adminphoneNumber from the request payload
      },
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

    // Find an admin for the specified company
    const adminRecord = await RegisteredPhoneNumber.findOne({ companyname, role: 'admin', adminaccept: true });

    if (adminRecord) { 
      // Find all users for the same company name and role 'user'
      const usersWithSameCompanyAndRole = await RegisteredUser.find({ companyname, role: 'user' });
      
      const usersWithAdminPhone = usersWithSameCompanyAndRole.map(user => {
        const userObject = user.toObject(); // Convert Mongoose document to a plain object
        return {
          ...userObject, // Spread user properties
          adminphoneNumber: adminRecord.phoneNumber, // Include adminphoneNumber
        };
      });

      res.json({
        success: true,
        status: 'allowed',
        adminData: adminRecord,
        users: usersWithAdminPhone,
        message: 'Matching users retrieved based on admin company and user role.',
      });
    } else {
      res.json({ success: false, status: 'not allowed', message: 'No matching admin found for the company or invalid role.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.put('/updateUser/:id', async (req, res) => {
  try {
    await RegisteredUser.findByIdAndUpdate(req.params.id, req.body);
    res.json('User details updated successfully');
  } catch (error) {
    console.error(error);
    res.status(400).json(`Error: ${error}`);
  }
});
//delete users
router.delete('/deleteUser/:id', async (req, res) => {
  try {
    // Find the user record by ID and remove it
    const deletedUser = await RegisteredUser.findByIdAndRemove(req.params.id);

    if (!deletedUser) {
      // If the user with the provided ID is not found
      return res.status(404).json({ message: 'User not found.', status: 'fail' });
    }

    // Respond with the deleted user record
    res.json({
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', status: 'error' });
  }
});
router.get('/getDocumentById/:id', async (req, res) => {
  try {
    const documentId = req.params.id;

    if (!documentId) {
      return res.status(400).json({ message: 'Document ID is required.' });
    }

   
    const document = await RegisteredPhoneNumber.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    res.json({ success: true, document });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;