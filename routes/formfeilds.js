const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');

const FormData = require('../Models/formschema'); 
const Section = require('../Models/sectionschema');

  router.post('/uploadbikes',jwtMiddleware.verifyToken, async (req, res) => {
    try {
      const {
        section,
        model,
        EngineCC,
        vehiclecolor,
        adminallimage,
        exShowroomPrice,
        registration,
        roadtax,
        phoneNumber,
        insurance,
        hypothication,
        extendedwarranty,
        colours,
        mirrors,
        oilfillercap,
        headlight,
        navigation,
        panniers,
        footpegs,
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
        model,
        EngineCC,
        vehiclecolor,
        adminallimage,
        exShowroomPrice,
        registration,
        roadtax,
        phoneNumber,
        insurance,
        hypothication,
        extendedwarranty,
        colours,
        mirrors,
        oilfillercap,
        headlight,
        navigation,
        panniers,
        footpegs,
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

  router.post('/uploadcare/:id', jwtMiddleware.verifyToken, async (req, res) => {
    try {
      const {
        Basic,
        Nildip,
        Ep,
        RTI,
        Yes,
        No,
        fouryears,
        fiveyears,
        fiveplusRSAyears,
        oneyear,
        twoyears,
        threeyears
      } = req.body;
  
      const query = { "_id": req.params.id }; // Access id from URL params
  
      // Check if a document with the specified ID exists
      const existingDoc = await FormData.findOne(query);
  
      if (existingDoc) {
        // If the document exists, update specific fields
        const update = {
          $set: {
            "insurance.0.Basic": Basic,
            "insurance.0.Nildip": Nildip,
            "insurance.0.Ep": Ep,
            "insurance.0.RTI": RTI,
            "hypothication.0.Yes": Yes,
            "hypothication.0.No": No,
            "extendedwarranty.0.fouryears": fouryears,
            "extendedwarranty.0.fiveyears": fiveyears,
            "extendedwarranty.0.fiveplusRSAyears": fiveplusRSAyears,
            "rsa.0.oneyear": oneyear,
            "rsa.0.twoyears": twoyears,
            "rsa.0.threeyears": threeyears,
          }
        };
  
        // Update the existing document
        const updatedDoc = await FormData.findOneAndUpdate(
          query,
          update,
          { new: true }
        );
  
        console.log("Updated document:", updatedDoc);

        res.status(200).json({
          message: updatedDoc,
          status: "success",
        });
      } else {
        // If the document doesn't exist, create a new one
        const formData = {
          insurance: [
            {
              Basic,
              Nildip,
              Ep,
              RTI
            }
          ],
          hypothication: [
            {
              Yes,
              No
            }
          ],
          extendedwarranty: [
            {
              fouryears,
              fiveyears,
              fiveplusRSAyears
            }
          ],
          rsa:[
            {
              oneyear,
              twoyears,
              threeyears
            }
          ]
        };
  
        const createdForm = await FormData.create(formData);
  
        console.log("Created document:", createdForm);
        res.status(201).json({
          message: createdForm,
          status: "success",
        });
      }
    } catch (error) {
      console.error('Error updating/creating document:', error);
      res.status(500).json({
        message: "Internal server error",
        status: "error",
      });
    }
  });
  router.get('/getcare',jwtMiddleware.verifyToken, async (req, res) => {  

    try {
        const user = await FormData.find({})
        
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).send(error)
        console.error(error)
    }
});
  router.post('/colours', jwtMiddleware.verifyToken, async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.colours; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { colours: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to colours array:', error);
      res.status(500).json({ message: 'Error pushing data to colours array' });
    }
  });

  router.delete('/colours/:id/:coloursId',jwtMiddleware.verifyToken, async (req, res) => {      
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const coloursId = req.params.coloursId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting colours with _id:', coloursId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { colours: { _id: coloursId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting colours from array:', error);
      res.status(500).json({ message: 'Error deleting colours from array' });
    }
  });

  router.post('/mirrors', async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.mirrors; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { mirrors: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to mirrors array:', error);
      res.status(500).json({ message: 'Error pushing data to mirrors array' });
    }
  });

  router.delete('/mirrors/:id/:mirrorsId', async (req, res) => {      
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const mirrorsId = req.params.mirrorsId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting colours with _id:', mirrorsId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { mirrors: { _id: mirrorsId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting mirrors from array:', error);
      res.status(500).json({ message: 'Error deleting mirrors from array' });
    }
  });

  router.post('/oil', jwtMiddleware.verifyToken, async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.oilfillercap; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { oilfillercap: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to oilfillercap array:', error);
      res.status(500).json({ message: 'Error pushing data to oilfillercap array' });
    }
  });

  router.delete('/oil/:id/:oilfillercapId', jwtMiddleware.verifyToken, async (req, res) => {      
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const oilfillercapId = req.params.oilfillercapId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting oilfillercap with _id:', oilfillercapId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { oilfillercap: { _id: oilfillercapId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting oilfillercap from array:', error);
      res.status(500).json({ message: 'Error deleting oilfillercap from array' });
    }
  });

  router.post('/headlight', jwtMiddleware.verifyToken, async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.headlight; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { headlight: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to headlight array:', error);
      res.status(500).json({ message: 'Error pushing data to headlight array' });
    }
  });

  router.delete('/headlight/:id/:headlightId', jwtMiddleware.verifyToken, async (req, res) => {      
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const headlightId = req.params.headlightId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting headlight with _id:', headlightId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { headlight: { _id: headlightId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting headlight from array:', error);
      res.status(500).json({ message: 'Error deleting headlight from array' });
    }
  });

  router.post('/nav', jwtMiddleware.verifyToken, async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.navigation; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { navigation: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to navigation array:', error);
      res.status(500).json({ message: 'Error pushing data to navigation array' });
    }
  });

  router.delete('/nav/:id/:navigationId', jwtMiddleware.verifyToken, async (req, res) => {      
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const headlightId = req.params.headlightId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting navigation with _id:', navigationId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { navigation: { _id: navigationId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting navigation from array:', error);
      res.status(500).json({ message: 'Error deleting navigation from array' });
    }
  });

  router.post('/pan', jwtMiddleware.verifyToken, async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.panniers; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { panniers: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to panniers array:', error);
      res.status(500).json({ message: 'Error pushing data to panniers array' });
    }
  });

  router.delete('/pan/:id/:panniersId', jwtMiddleware.verifyToken, async (req, res) => {      
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const panniersId = req.params.panniersId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting panniers with _id:', panniersId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { panniers: { _id: panniersId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting panniers from array:', error);
      res.status(500).json({ message: 'Error deleting panniers from array' });
    }
  });

  router.post('/foot', jwtMiddleware.verifyToken, async (req, res) => {
    const _id = req.query._id; // Get the document _id from the URL query parameters
  
    try {
      const objectToPush = req.body.footpegs; 
  
      console.log('Updating document with _id:', _id);
      console.log('Object to push:', objectToPush);
  
      // Update the document using the $push operator
      const updatedForm = await FormData.findByIdAndUpdate(
        _id,
        { $push: { footpegs: objectToPush } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error pushing data to footpegs array:', error);
      res.status(500).json({ message: 'Error pushing data to footpegs array' });
    }
  });

  router.delete('/foot/:id/:footpegsId', jwtMiddleware.verifyToken, async (req, res) => {      
    const formId = req.params.id; // Get the form's document _id from the URL parameter
    const footpegsId = req.params.footpegsId; // Get the seat's _id to delete from the URL parameter
  
    try {
      console.log('Deleting footpegs with _id:', footpegsId);
  
      // Update the document using the $pull operator
      const updatedForm = await FormData.findByIdAndUpdate(
        formId,
        { $pull: { footpegs: { _id: footpegsId } } },
        { new: true }
      );
  
      console.log('Updated document:', updatedForm);
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error deleting footpegs from array:', error);
      res.status(500).json({ message: 'Error deleting footpegs from array' });
    }
  });

  router.post('/acc', jwtMiddleware.verifyToken, async (req, res) => {
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

  router.delete('/acc/:id/:safetyaccessoriesId', jwtMiddleware.verifyToken, async (req, res) => {      
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


  router.post('/wind', jwtMiddleware.verifyToken, async (req, res) => {
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

  router.delete('/wind/:id/:windshieldId',  jwtMiddleware.verifyToken, async (req, res) => {
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
  
  
  router.post('/seats', jwtMiddleware.verifyToken, async (req, res) => {
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

  router.delete('/seats/:id/:seatId', jwtMiddleware.verifyToken, async (req, res) => {
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

  router.post('/back', jwtMiddleware.verifyToken, async (req, res) => {       
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

  router.delete('/back/:id/:backrestId', jwtMiddleware.verifyToken, async (req, res) => {
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
  
  
  router.post('/storage', jwtMiddleware.verifyToken, async (req, res) => {           
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

  router.delete('/storage/:id/:storageaccessoriesId', jwtMiddleware.verifyToken, async (req, res) => {
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

  router.post('/engine', jwtMiddleware.verifyToken, async (req, res) => {   
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

  router.delete('/engine/:id/:enginegaurdsId', jwtMiddleware.verifyToken, async (req, res) => {
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

  router.post('/sump', jwtMiddleware.verifyToken, async (req, res) => {          
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

  router.delete('/sump/:id/:sumpgaurdsId', jwtMiddleware.verifyToken, async (req, res) => {
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

  router.post('/other', jwtMiddleware.verifyToken, async (req, res) => {          
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

  router.delete('/other/:id/:otheraccessoriesId', jwtMiddleware.verifyToken, async (req, res) => {
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
  
  router.get('/getbike/:id',  jwtMiddleware.verifyToken, async (req, res) => {
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

router.get('/getbikes/:section', jwtMiddleware.verifyToken, async (req, res) => {
  try {
      const section = req.params.section; // Get the "section" parameter from the URL
      console.log('sec', section)
      const phoneNumber = req.query.phoneNumber; // Get the "phoneNumber" query parameter
      console.log('phn', phoneNumber)
      
      const bikes = await FormData.find({ section, phoneNumber});
      
      res.status(200).json({ bikes });
  } catch (error) {
      res.status(400).send(error);
      console.log(error);
  }
});

// router.get('/getbikes', jwtMiddleware.verifyToken, async (req, res) => {  

//         try {
            
//             const user = await FormData.find({})
            
//             res.status(200).json({ user })
//         } catch (error) {
//             res.status(400).send(error)
//             console.log(error)
//         }
//     })

router.get('/getbikes', jwtMiddleware.verifyToken, async (req, res) => {
  try {
      const phoneNumber = req.query.phoneNumber;
      console.log('phn',phoneNumber)

      if (!phoneNumber) {
          return res.status(400).json({ message: 'Missing phoneNumber query parameter' });
      }

      const bikeDetails = await FormData.find({ phoneNumber });
      console.log('bike',bikeDetails)

      if (!bikeDetails || bikeDetails.length === 0) {
          return res.status(404).json({ message: 'Bike details not found for the specified phone number' });
      }

      res.status(200).json(bikeDetails);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

    router.put('/updatebikes/:id', jwtMiddleware.verifyToken, (req, res) => {
        FormData.findByIdAndUpdate(req.params.id, req.body)  
            .then(() => res.json('Bikes updated'))
            .catch(err => res.status(400).json(`Error: ${err}`));

    })
    
    router.delete('/deletebikes/:id', jwtMiddleware.verifyToken, (req, res) => {
        FormData.findByIdAndDelete(req.params.id)  
            .then(() => res.json('Bikes deleted'))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })    
module.exports = router;
