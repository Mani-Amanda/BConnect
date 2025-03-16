const express=require('express');
const router=express.Router();
const Business=require('../models/businessModel');

//Create New Business Profile
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.owner ||
      !request.body.name ||
      !request.body.category ||
      !request.body.description ||
      !request.body.city ||
      !request.body.address ||
      !request.body.email ||
      !request.body.phone
    ) {
      return response.status(400).send({
        message: 'Send all required fields: owner, name, category, description, city, address, email, phone',
      });
    }

    const newProfile = {
      owner: request.body.owner,
      name: request.body.name,
      category: request.body.category,
      description: request.body.description,
      city: request.body.city,
      address: request.body.address,
      email: request.body.email,
      phone: request.body.phone,
    };

    const savedProfile = await Business.create(newProfile);
    response.status(201).json(savedProfile); 

  } catch (err) {
    console.log(err.message); 
    response.status(500).json({ error: err.message }); 
  }
});


  //Get all Business Profiles
  router.get('/', async (req, res) => {
    try {
      const businesses = await Business.find();  
      res.json(businesses);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

//Get Bussiness profilew that each owner owns
  router.get('/:ownerId', async (req, res) => {
    try {
      const { ownerId } = req.params;
      const businesses = await Business.find({ owner: ownerId });
      
      if (!businesses) {
        return res.status(404).json({ message: 'No businesses found for this owner' });
      }
      
      res.status(200).json(businesses);  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //Update Bussiness Profile
  router.put('/:businessId', async (req, res) => {
    try {
      const { businessId } = req.params; 
      const updatedData = req.body; 
  
      const updatedBusiness = await Business.findByIdAndUpdate(businessId, updatedData, { new: true });
  
      if (!updatedBusiness) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      res.json(updatedBusiness);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  //Delete business Profile
  router.delete('/:businessId', async (req, res) => {
    try {
      const { businessId } = req.params;
  
      const deletedBusiness = await Business.findByIdAndDelete(businessId);
  
      if (!deletedBusiness) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      res.status(200).json({ message: 'Business deleted successfully' });
    } catch (error) {
      console.error('Error deleting business:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;