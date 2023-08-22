const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();
const FormData = require('../Models/formschema'); 
const config = {
  accessKeyId: 'AKIAVMRPENK3IVSXIVXR',
  secretAccessKey: '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',
  region: 'us-east-2',
};

const s3 = new AWS.S3({
  credentials: config,
  region: config.region,
});

router.post('/upload/:id', async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

    const uploadPromises = files.map((file) => {
      const uniqueKey = Date.now().toString(); // Use a unique key for each file
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uniqueKey}.${fileExtension}`;

      const params = {
        Bucket: 'laxmi-bucket',
        Key: fileName,
        Body: file.data,
        ACL: 'public-read', // Set the ACL as per your requirements
      };

      return s3.upload(params).promise();
    });

    const results = await Promise.all(uploadPromises);
    const fileUrls = results.map((result) => result.Location);

    const query = { "_id": req.params.id };
    const Rest = {
      $push: {
        "adminallimages": fileUrls,
        "cardimages":fileUrls,
      },
    };

    const updatedDoc = await FormData.findOneAndUpdate(query, Rest).select().exec();

    if (updatedDoc) {
      return res.status(200).json({
        data: updatedDoc,
        message: "Images uploaded successfully",
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
      message: "Failed to upload images or update document",
      status: "failed",
      error: err.message
    });
  }
});

module.exports = router;
