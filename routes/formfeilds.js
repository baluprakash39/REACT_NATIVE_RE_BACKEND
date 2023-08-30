const express = require('express');
const router = express.Router();

const FormData = require('../Models/formschema'); 

  router.post('/uploadbikes', async (req, res) => {
    try {
      const {
        section,
        vehiclename,
        model,
        EngineCC,
        vehiclecolor,
        exShowroomPrice,
        registration,
        roadtax,
        insurance,
        hypothication,
        extendedwarranty,
        safetyaccessories,
        windshields,
        seats,
        backrests,
        storageaccessories,
        enginegaurds,
        sumpgaurds,
        otheraccessories,
      
      } = req.body;
  
      const formData = {
        section,
        vehiclename,
        model,
        EngineCC,
        vehiclecolor,
        exShowroomPrice,
        registration,
        roadtax,
        insurance,
        hypothication,
        extendedwarranty,
        safetyaccessories,
        windshields,
        seats,
        backrests,
        storageaccessories,
        enginegaurds,
        sumpgaurds,
        otheraccessories,
       
      };
  
      const createdForm = await FormData.create(formData);
      res.status(201).json(createdForm);
    } catch (error) {
      console.error('Error creating form:', error);
      res.status(500).json({ message: 'Error creating form' });
    }
  });

  router.post('/insurance', async (req, res) => {
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

  router.post('/hypo', async (req, res) => {
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

  router.post('/warranty', async (req, res) => {
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

  router.post('/acc', async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.safetyaccessories; // Extract the entire safetyaccessories object
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { safetyaccessories: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to safetyaccessories array:', error);
      res.status(500).json({ message: 'Error pushing data to safetyaccessories array' });
    }
  });

  router.delete('/acc/:id/:safetyaccessoriesId', async (req, res) => {      
  const formId = req.params.id; // Get the form's document _id from the URL parameter
  const safetyaccessoriesId = req.params.safetyaccessoriesId; // Get the seat's _id to delete from the URL parameter

  try {
    console.log('Deleting safetyaccessories with _id:', safetyaccessoriesId);

    // Update the document using the $pull operator
    const updatedForm = await FormData.findByIdAndUpdate(
      formId,
      { $pull: { safetyaccessories: { _id: safetyaccessoriesId } } },
      { new: true }
    );

    console.log('Updated document:', updatedForm);

    if (!updatedForm) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error deleting safetyaccessories from array:', error);
    res.status(500).json({ message: 'Error deleting safetyaccessories from array' });
  }
});


  router.post('/wind', async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.windshields; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { windshields: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to windshields array:', error);
      res.status(500).json({ message: 'Error pushing data to windshields array' });
    }
  });

  router.delete('/wind/:id/:windshieldId', async (req, res) => {
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const windshieldId = req.params.windshieldId; // Get the windshield's _id to delete from the URL parameter
  
    try {
      console.log('Deleting windshield with _id:', windshieldId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { windshields: { _id: windshieldId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting windshield from array:', error);
      res.status(500).json({ message: 'Error deleting windshield from array' });
    }
  });
  

  
  router.post('/seats', async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.seats; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { seats: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) { 
      console.error('Error pushing data to seats array:', error);
      res.status(500).json({ message: 'Error pushing data to seats array' });
    }
  });

  router.delete('/seats/:id/:seatId', async (req, res) => {
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const seatId = req.params.seatId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting seat with _id:', seatId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { seats: { _id: seatId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting seat from array:', error);
      res.status(500).json({ message: 'Error deleting seat from array' });
    }
  });

  router.post('/back', async (req, res) => {       
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.backrests; // Extract the entire safetyaccessories object
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { backrests: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to backrests array:', error);
      res.status(500).json({ message: 'Error pushing data to backrests array' });
    }
  });

  router.delete('/back/:id/:backrestId', async (req, res) => {
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const backrestId = req.params.backrestId; // Get the backrest's _id to delete from the URL parameter
  
    try {
      console.log('Deleting backrest with _id:', backrestId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { backrests: { _id: backrestId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting backrest from array:', error);
      res.status(500).json({ message: 'Error deleting backrest from array' });
    }
  });
  
  
  router.post('/storage', async (req, res) => {           
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.storageaccessories; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { storageaccessories : objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to storageaccessories array:', error);
      res.status(500).json({ message: 'Error pushing data to storageaccessories array' });
    }
  });

  router.delete('/storage/:id/:storageaccessoriesId', async (req, res) => {
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const seatId = req.params.seatId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting storageaccessories with _id:', storageaccessoriesId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { storageaccessories: { _id: storageaccessoriesId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting storageaccessories from array:', error);
      res.status(500).json({ message: 'Error deleting storageaccessories from array' });
    }
  });

  router.post('/engine', async (req, res) => {   
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.enginegaurds; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { enginegaurds: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to enginegaurds array:', error);
      res.status(500).json({ message: 'Error pushing data to enginegaurds array' });
    }
  });

  router.delete('/engine/:id/:enginegaurdsId', async (req, res) => {
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const enginegaurdsId = req.params.enginegaurdsId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting enginegaurds with _id:', enginegaurdsId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { enginegaurds: { _id: enginegaurdsId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting enginegaurds from array:', error);
      res.status(500).json({ message: 'Error deleting enginegaurds from array' });
    }
  });

  router.post('/sump', async (req, res) => {          
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.sumpgaurds; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { sumpgaurds: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to sumpgaurds array:', error);
      res.status(500).json({ message: 'Error pushing data to sumpgaurds array' });
    }
  });

  router.delete('/sump/:id/:sumpgaurdsId', async (req, res) => {
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const sumpgaurdsId = req.params.sumpgaurdsId; 
  
    try {
      console.log('Deleting sumpgaurds with _id:', sumpgaurdsId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { sumpgaurds: { _id: sumpgaurdsId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting sumpgaurds from array:', error);
      res.status(500).json({ message: 'Error deleting sumpgaurds from array' });
    }
  });

  router.post('/other', async (req, res) => {          
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.otheraccessories;
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { otheraccessories: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to otheraccessories array:', error);
      res.status(500).json({ message: 'Error pushing data to otheraccessories array' });
    }
  });

  router.delete('/other/:id/:otheraccessoriesId', async (req, res) => {
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const otheraccessoriesId = req.params.otheraccessoriesId; // Get the otheraccessories _id to delete from the URL parameter
  
    try {
      console.log('Deleting otheraccessories with _id:', otheraccessoriesId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { otheraccessories: { _id: otheraccessoriesId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting otheraccessories from array:', error);
      res.status(500).json({ message: 'Error deleting otheraccessories from array' });
    }
  });
  
  router.get('/getbike/:id', async (req, res) => {
    try {
        const bikeId = req.params.id;

        // Find the bike with the provided ID
        const bike = await FormData.findById(bikeId);

        if (!bike) {
            return res.status(404).json({ message: 'Bike not found' });
        }

        res.status(200).json(bike);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
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
            .then(() => res.json('Bikes updated'))
            .catch(err => res.status(400).json(`Error: ${err}`));

    })
    router.delete('/deletebikes/:id', (req, res) => {
        FormData.findByIdAndDelete(req.params.id)  
            .then(() => res.json('Bikes deleted'))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })    
module.exports = router;
