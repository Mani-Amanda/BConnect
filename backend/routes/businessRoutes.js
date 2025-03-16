const express=require('express');
const router=express.Router();
const Business=require('../models/businessModel');

router.post('/', async (request, response) => {
    try {
      if(
        !request.body.owner ||
        !request.body.name||
        !request.body.category||
        !request.body.description||
        !request.body.city||
        !request.body.address||
        !request.body.email||
        !request.body.phone

    ){
        return response.status(400).send({
            message:'Send all required feilds: owner, name, category, desciption, city, address, email, phone',
        });
    }
    const newProfile={
      owner: request.body.owner,
      name: request.body.name,
      category: request.body.category,
      description:request.body.description,
      city:request.body.city,
      address:request.body.address,
      email:request.body.email,
      phone:request.body.phone,
    };
      
      const savedProfile = await Business.create(newProfile);
      res.status(201).json(savedProfile);
    } catch (err) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  });

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

  router.put('/:businessId', async (req, res) => {
    try {
      const { businessId } = req.params;  // Get business ID from the URL
      const updatedData = req.body;  // Get updated data from the request body
  
      // Update the business using findByIdAndUpdate
      const updatedBusiness = await Business.findByIdAndUpdate(businessId, updatedData, { new: true });
  
      if (!updatedBusiness) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      // Return the updated business data
      res.json(updatedBusiness);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

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