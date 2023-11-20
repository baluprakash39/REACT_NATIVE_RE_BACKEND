const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');
const FormData = require('../Models/formschema'); 
const config = {
  accessKeyId: 'AKIA4NZVQN5SIJCFS36Y',
  secretAccessKey: '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',
  // region: 'us-east-2',
};

const s3 = new AWS.S3({
  credentials: config,
  // region: config.region,
});

router.get('/images', jwtMiddleware.verifyToken, async (req,res) =>{ 
  try{    
      const images = await FormData.find({})  
      res.status(200).json({
          Totalimages : images,
      })
  }catch (error) {
      res.status(400).send(error)
  } 
  })

// router.post('/upload/:id', async (req, res) => {
//   try {
//     if (!req.files || !req.files.adminallimages) {
//       return res.status(400).json({ message: 'No files were uploaded.' });
//     }

//     const files = Array.isArray(req.files.adminallimages) ? req.files.adminallimages : [req.files.adminallimages];

//     // Filter out empty or undefined files
//     const validFiles = files.filter((file) => file && file.data);

//     if (validFiles.length === 0) {
//       return res.status(400).json({ message: 'No valid files were uploaded.' });
//     }

//     const uploadPromises = validFiles.map((file) => {
//       const uniqueKey = Date.now().toString(); // Use a unique key for each file
//       const fileExtension = file.name.split('.').pop();
//       const fileName = `${uniqueKey}.${fileExtension}`;

//       const params = {
//         Bucket: 'laxmi-bucket',
//         Key: fileName,
//         Body: file.data,
//         ACL: 'public-read', // Set the ACL as per your requirements
//       };

//       return s3.upload(params).promise();
//     });

//     const results = await Promise.all(uploadPromises);
//     const fileUrls = results.map((result) => result.Location);

//     const query = { "_id": req.params.id };
//     const Rest = {
//       $push: {
//         "adminallimages": {
//           $each: fileUrls
//         }
//       }
//     };

//     const updatedDoc = await FormData.findOneAndUpdate(query, Rest).select().exec();

//     if (updatedDoc) {
//       return res.status(200).json({
//         data: updatedDoc,
//         message: "Images uploaded successfully",
//         status: "success"
//       });
//     } else {
//       return res.status(400).json({
//         message: "No matching document found for the given ID",
//         status: "no match"
//       });
//     }
//   } catch (err) {
//     return res.status(400).json({
//       message: "Failed to upload images or update document",
//       status: "failed",
//       error: err.message
//     });
//   }
// });

router.post('/upload/:id', jwtMiddleware.verifyToken, async (req, res) => {
  try {
    if (!req.files || !req.files.adminallimage) {
      return res.status(400).json({ message: 'No file was uploaded.' });
    }

    const file = req.files.adminallimage;

    if (!file || !file.data) {
      return res.status(400).json({ message: 'No valid file was uploaded.' });
    }

    const uniqueKey = Date.now().toString();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uniqueKey}.${fileExtension}`;

    const params = {
      Bucket: 'motoq',
      Key: fileName,
      Body: file.data,
      ACL: 'public-read',
    };

    const uploadResult = await s3.upload(params).promise();
    const fileUrl = uploadResult.Location;

    const query = { "_id": req.params.id };
    const update = { "adminallimage": fileUrl }; // Change to adminallimage

    const updatedDoc = await FormData.findOneAndUpdate(query, update, { new: true }).exec();

    if (updatedDoc) {
      return res.status(200).json({
        data: updatedDoc,
        message: "Image uploaded successfully",
        status: "success"
      });
    } else {
      return res.status(400).json({
        message: "No matching document found for the given ID",
        status: "no match"
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Failed to upload image or update document",
      status: "failed",
      error: err.message
    });
  }
});

router.delete('/deleteImage/:id',jwtMiddleware.verifyToken, async (req, res) => {
  const { role } = req;
  if (role !== 'admin') {
      return res.status(403).json({ message:'Forbid'});
  }
  try {
    const query = { "_id": req.params.id };

    // Find the document to get the adminallimage URL
    const document = await FormData.findOne(query).exec();

    if (!document) {
      return res.status(404).json({
        message: "No matching document found for the given ID",
        status: "not found"
      });
    }

    // Delete the document from MongoDB
    const deletedDoc = await FormData.findOneAndDelete(query).exec();

    // Extract the image URL
    const imageUrl = document.adminallimage;

    // Parse the S3 key from the URL
    const s3Key = new URL(imageUrl).pathname.substring(1);

    // Delete the associated image from your S3 bucket
    await s3.deleteObject({ Bucket: 'laxmi-bucket', Key: s3Key }).promise();

    return res.status(200).json({
      data: deletedDoc,
      message: "Document and associated image deleted successfully",
      status: "success"
    });
  } catch (err) {
    return res.status(400).json({
      message: "Failed to delete document or associated image",
      status: "failed",
      error: err.message
    });
  }
});
module.exports = router;
