// const express = require('express');
// const AWS = require('aws-sdk');


// const app = express();

// // Set up Amazon S3
// const s3 = new AWS.S3({
//   accessKeyId: 'YOUR_ACCESS_KEY_ID',
//   secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
// });


// // Define a route for image upload
// app.post('/upload', async (req, res) => {
//   try {
//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ error: 'No files were uploaded.' });
//     }

//     const file = req.files.image;
//     const params = {
//       Bucket: 'YOUR_S3_BUCKET_NAME',
//       Key: file.name,
//       Body: file.data,
//       ACL: 'public-read', // Set the ACL as needed
//     };

//     // Upload the file to S3
//     s3.upload(params, async (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Error uploading file to S3' });
//       }

//       // Store the image URL in MongoDB
//       const imageUrl = data.Location;

//       const formData = new Form({
//         adminallimages: [imageUrl], // Assuming you want to store it in an array
//         // Add other form fields here
//       });

//       const savedForm = await formData.save();

//       return res.status(200).json({ message: 'File uploaded successfully', imageUrl });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });
