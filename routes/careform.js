const express = require('express');
const router = express.Router();

const FormData = require('../Models/careschema.js'); 


router.get('/getcare', async (req, res) => {  

    try {
        const user = await FormData.find({})
        
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
});

module.exports = router;