// const express = require('express');
// const AWS = require('aws-sdk');
// const router = express.Router();
// const FormData = require('../Models/accessoriesschema'); 

// const config = {
//   accessKeyId: 'AKIAVMRPENK3IVSXIVXR',
//   secretAccessKey: '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',
//   region: 'us-east-2',
// };

// const s3 = new AWS.S3({
//   credentials: config,
//   region: config.region,
// });
// router.get('/getbikes', async (req, res) => {  
//     try {
//         const user = await FormData.find({})
        
//         res.status(200).json({ user })
//     } catch (error) {
//         res.status(400).send(error)
//         console.log(error)
//     }
// });

// router.post('/adminupload', (req, res) => {
//   if (!req.files) {
//     return res.status(400).json({ message: 'No files were uploaded.' });
//   }
// console.log(req.files)
//   const files = Array.isArray(req.files.adminimages) ? req.files.adminimages : [req.files.adminimages];

//   const uploadPromises = files.map((file) => {
//     const uniqueKey = Date.now().toString(); // Use a unique key for each file
//     const fileExtension = file.name.split('.').pop();
//     const fileName = `${uniqueKey}.${fileExtension}`;

//     const params = {
//       Bucket: 'laxmi-bucket',
//       Key: fileName,
//       Body: file.data,
//       ACL: 'public-read', // Set the ACL as per your requirements
//     };

//     return s3.upload(params).promise();
//   });

//   Promise.all(uploadPromises)
//     .then(async (results) => {
//       const fileUrls = results.map((result) => result.Location);

//       const path = fileUrls;
//       console.log(fileUrls)
//       const fileLocation = fileUrls;
//       const imagePath = new FormData({
//         adminallimages: fileLocation,
//         section :req.body.section ,
//         vehiclename :req.body.vehiclename,
//         model:req.body.model ,
//         EngineCC:req.body.EngineCC,
//         vehiclecolor:req.body.vehiclecolor,
//         exShowroomPrice:req.body.exShowroomPrice ,
//         showroomPrice:req.body.showroomPrice ,
//         insurance:req.body.insurance ,
//         registration:req.body.registration ,
//         roadtax:req.body.roadtax,
//         handelingcharges:req.body.handelingcharges,
//         logisticscharges:req.body.logisticscharges,
//         othercharges:req.body.othercharges,
//         GST:req.body.GST
//       });
//       console.log(imagePath);
//       await imagePath.save().then(doc => {
//         return res.status(200).json({
//           message: 'Image uploaded successfully in mongo',
//           location: doc,
//         });

//       }).catch(err => {
//         return res.status(500).json({
//           message: "Image failed to upload"
//         });
//       });
//     })
//     .catch((error) => {
//       console.error('Upload error:', error);
//       return res.status(500).json({ message: 'An error occurred during file upload.' });
//     });
    
//     router.put('/updatebikes/:id', (req, res) => {
//       FormData.findByIdAndUpdate(req.params.id, req.body)  
//           .then(() => res.json('Bikes updated'))
//           .catch(err => res.status(400).json(`Error: ${err}`));

//   })
//   router.delete('/deletebikes/:id', (req, res) => {
//       FormData.findByIdAndDelete(req.params.id)  
//           .then(() => res.json('Bikes deleted'))
//           .catch(err => res.status(400).json(`Error: ${err}`));
//   })    

// });


// module.exports = router;

const express = require('express');
const router = express.Router();

const FormData = require('../Models/formschema'); 

router.post('/uploadbikes', (req, res) => {
    console.log('Received a POST request for accessoriesform');

             
    const form = new FormData({
      section :req.body.section ,
        vehiclename :req.body.vehiclename,
        model:req.body.model ,
        EngineCC:req.body.EngineCC,
        vehiclecolor:req.body.vehiclecolor,
        cardimages:req.body.cardimages,
        exShowroomPrice:req.body.exShowroomPrice ,
        showroomPrice:req.body.showroomPrice ,
        insurance:req.body.insurance ,
        registration:req.body.registration ,
        roadtax:req.body.roadtax,
        handelingcharges:req.body.handelingcharges,
        logisticscharges:req.body.logisticscharges,
        othercharges:req.body.othercharges,
        GST:req.body.GST,
        accessoriestype:req.body.accessoriestype,
        safetyaccessories:req.body.safetyaccessories,
        windshields:req.body.windshields,
        seats:req.body.seats,
        backrests:req.body.backrests,
        storageaccessories:req.body.storageaccessories,
        enginegaurds:req.body.enginegaurds,
        sumpgaurds:req.body.sumpgaurds,
        otheraccessories:req.body.otheraccessories,
        accessoriesname:req.body.accessoriesname,
        accessoriesvalue:req.body.accessoriesvalue
     
      
    });

    form.save()
        .then(result => {
            res.status(201).json({
                message: "accessories posted",
                createdForm: result
            });
            console.log(result);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: error });
        });

      
    })
    router.get('/getbikes', async (req, res) => {  
        try {
            const user = await FormData.find({})
            
            res.status(200).json({ user })
        } catch (error) {
            res.status(400).send(error)
            console.log(error)
        }
    })
    router.put('/updatebikes/:id', (req, res) => {
        FormData.findByIdAndUpdate(req.params.id, req.body)  
            .then(() => res.json('accessories updated'))
            .catch(err => res.status(400).json(`Error: ${err}`));

    })
    router.delete('/deletebikes/:id', (req, res) => {
        FormData.findByIdAndDelete(req.params.id)  
            .then(() => res.json('accessories deleted'))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })    
module.exports = router;
