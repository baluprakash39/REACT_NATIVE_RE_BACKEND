const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');

const Section = require('../Models/sectionschema'); 

router.post('/addbike', jwtMiddleware.verifyToken, async (req,res) => {
    const section = new Section(req.body)
    section.save().then (result => {
        res.status (201).json({
            message:"Bike Data created",
            createdSection: section
        })
    })
    .catch (error => {
        res.status(400).json({Error:error})
    })
    
});

router.get('/bikes', jwtMiddleware.verifyToken, async (req,res) =>{ 
    try{         
        const sections = await Section.find({})  // async makes a function return a Promise
                                                 //await makes a function wait for a Promise
        res.status(200).json({
            TotalSections : sections.length,   // length of the employees in schema
            sections
        })
    }catch (error) {
        res.status(400).send(error)
    } 
    })
 
    router.put('/updatebike/:id', jwtMiddleware.verifyToken, async (req, res) => {
        const sectionId = req.params.id;
        const updatedSectionName = req.body.Sectionname;
      
        try {
          const section = await Section.findById(sectionId);
          
          if (!section) {
            return res.status(404).json({ message: "Section not found" });
          }
      
          section.Sectionname = updatedSectionName;
          await section.save();
      
          res.status(200).json({
            message: "Bike Section updated",
            updatedSection: section
          });
        } catch (error) {
          res.status(400).json({ Error: error });
        }
      });
      router.delete('/deletebike/:id', jwtMiddleware.verifyToken, async (req, res) => {
        const sectionId = req.params.id;
      
        try {
          const section = await Section.findByIdAndDelete(sectionId);
          
          if (!section) {
            return res.status(404).json({ message: "Section not found" });
          }
      
          res.status(200).json({
            message: "Bike Section deleted",
            deletedSection: section
          });
        } catch (error) {
          res.status(400).json({ Error: error });
        }
      });
      module.exports = router;