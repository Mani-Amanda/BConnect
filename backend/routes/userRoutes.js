const express = require('express');
const router=express.Router();
const User=require('../models/userModels');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// POST request to sign up a new user
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Check if the email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      if(
        !req.body.name ||
        !req.body.email||
        !req.body.password||
        !req.body.role
    ){
        return response.status(400).send({
            message:'Send all required feilds: name,email,password,role',
        });
    }
  
      // Create a new user
      const user = new User({ name, email, password, role });
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({
        message: 'User created successfully',
        userId: user._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

// Login Route (Authenticate User)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = generateToken(user._id);
  
      res.status(200).json({
        message: 'Login successful',
        token,
        userId: user._id,
        role: user.role,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;