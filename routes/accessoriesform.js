const express = require('express');
const router = express.Router();

const FormData = require('../Models/accessoriesschema'); 

router.post('/uploadacc', (req, res) => {
    console.log('Received a POST request for accessoriesform');

    const { vehiclename, vehiclemodel, EngineCC, colorvarients, accessoriestype, safetyaccessories, windshields, seats, backrests, storageaccessories,
            enginegaurds, sumpgaurds, otheraccessories,  accessoriesname, accessoriesvalue } = req.body;

            
    const form = new FormData({
      vehiclename, 
      vehiclemodel, 
      EngineCC, 
      colorvarients, 
      accessoriestype,
      safetyaccessories,
      windshields,
      seats,
      backrests,
      storageaccessories,
      enginegaurds,
      sumpgaurds,
      otheraccessories,
      accessoriesname, 
      accessoriesvalue
      
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
    router.get('/getacc', async (req, res) => {  
        try {
            const user = await FormData.find({})
            
            res.status(200).json({ user })
        } catch (error) {
            res.status(400).send(error)
            console.log(error)
        }
    })
    router.put('/updateacc/:id', (req, res) => {
        FormData.findByIdAndUpdate(req.params.id, req.body)  
            .then(() => res.json('accessories updated'))
            .catch(err => res.status(400).json(`Error: ${err}`));

    })
    router.delete('/deleteacc/:id', (req, res) => {
        FormData.findByIdAndDelete(req.params.id)  
            .then(() => res.json('accessories deleted'))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })    
module.exports = router;
