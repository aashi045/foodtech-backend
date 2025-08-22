const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const MenusRoutes = require('./menuRoutes')
const orderRoutes=require('./orderRoutes')
router.use('/auth', authRoutes);

router.use('/restaurants', restaurantRoutes);
router.use('/menu', MenusRoutes)
router.use('/order',orderRoutes)

module.exports = router;