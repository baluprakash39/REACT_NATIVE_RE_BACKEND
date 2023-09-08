const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();
const FormData = require('../Models/Dealersschema'); 

AWS.config.update ({
  accessKeyId: 'AKIAVMRPENK3IVSXIVXR',
  secretAccessKey: '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',
  region: 'us-east-2',
});

router.post('/single', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  const file = req.files.image;

  const s3 = new AWS.S3();
  const bucketName = 'laxmi-bucket';
  //const key = `images/${file.name}`;
  const timestamp = Date.now(); // Generate a timestamp
  const key = `images/${timestamp}-${file.name}`;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file.data,
    ACL: "public-read"
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error('Error uploading image to S3:', err);
      return res.status(500).json({ error: 'Error uploading image.' });
    } else {
      console.log('Image uploaded successfully:', data);
      const path = data;
      console.log(path.Location)
      const fileLocation = path.Location
      const imagePath = new FormData({
        image: fileLocation,
        companyname:req.body.companyname,
        companyaddress:req.body.companyaddress,
        streetname:req.body.streetname,
        city:req.body.city,
        pincode:req.body.pincode,
        state:req.body.contactnumber,
        country:req.body.contactnumber,
        contactnumber:req.body.contactnumber,
        emailid:req.body.emailid,
        website:req.body.website,
    
      })
      console.log(imagePath)
      await imagePath.save().then(doc => {
        return res.status(200).json({
          message: 'Image uploaded successfully in mongo',
          location: doc,
        })

      }).catch(err => {
        return res.status(500).json({
          message: "Image failed to upload"
        })
      })

    }
  });
});


router.get('/getdetails', async (req, res) => {  

  try {
      const user = await FormData.find({})
      
      res.status(200).json({ user })
  } catch (error) {
      res.status(400).send(error)
      console.log(error)
  }
})

router.put('/update/:id', (req, res) => {
  FormData.findByIdAndUpdate(req.params.id, req.body)  
      .then(() => res.json('details updated'))
      .catch(err => res.status(400).json(`Error: ${err}`));

})

module.exports = router