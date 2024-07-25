const express = require('express');
const router = express.Router();
const User = require('../Modal/user'); // Adjust the path as needed
const Product = require('../Modal/Product'); // Adjust the path as needed

// Route to get user details including full createdProducts details
router.get('/user/info/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Find the user and populate the createdProducts field
    const user = await User.findById(id).populate('createdProducts')

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(user);
    return res.json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
