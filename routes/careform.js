const express = require('express');
const router = express.Router();

const FormData = require('../Models/careschema.js'); 

router.post('/uploadcare', async (req, res) => {
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
      fiveyearsPlusRSA, 
    } = req.body;

    const formData = {
      Basic,
      Nildip,
      Ep,
      RTI,
      Yes,
      No,
      fouryears,
      fiveyears,
      fiveyearsPlusRSA, 
    };

    const createdForm = await FormData.create(formData);
    res.status(201).json(createdForm);
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ message: 'Error creating form' });
  }
});
router.get('/getcare', async (req, res) => {  

    try {
        const user = await FormData.find({})
        
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
});
router.put('/updatecare/:id', (req, res) => {
    FormData.findByIdAndUpdate(req.params.id, req.body)  
        .then(() => res.json('care updated'))
        .catch(err => res.status(400).json(`Error: ${err}`));

});
module.exports = router;