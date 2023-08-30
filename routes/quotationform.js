const express = require('express');
const router = express.Router();

const FormData = require('../Models/quotationschema'); 

router.get('/getdetails', async (req, res) => {  

    try {
        const user = await FormData.find({})
        
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
});

router.post('/uploadquotation', async (req, res) => {
    try {
      const {
        customername,
        address,
        mobilenumber,
        emailid,
        vehiclename ,
        model,
        EngineCC,
        vehiclecolor,
        images,
        RTOcharges,
        onroadprice,
        exShowroomPrice,
        registration,
        grandtotal,
        insurance,
        hypothication,
        extendedwarranty
        
      } = req.body;
  
      const formData = {
        customername,
        address,
        mobilenumber,
        emailid,
        vehiclename ,
        model,
        EngineCC,
        vehiclecolor,
        images,
        RTOcharges,
        onroadprice,
        exShowroomPrice,
        registration,
        grandtotal,
        insurance,
        hypothication,
        extendedwarranty
       
      };
  
      const createdForm = await FormData.create(formData);
      res.status(201).json(createdForm);
    } catch (error) {
      console.error('Error creating form:', error);
      res.status(500).json({ message: 'Error creating form' });
    }
  });
  router.post('/quoteinsurance', async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.insurance; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { insurance: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to insurance array:', error);
      res.status(500).json({ message: 'Error pushing data to insurance array' });
    }
  });
  router.post('/quotationhypo', async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.hypothication; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { hypothication: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to hypothication array:', error);
      res.status(500).json({ message: 'Error pushing data to hypothication array' });
    }
  });
  router.post('/quowarranty', async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.extendedwarranty; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { extendedwarranty: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to extendedwarranty array:', error);
      res.status(500).json({ message: 'Error pushing data to extendedwarranty array' });
    }
  });
  module.exports = router;