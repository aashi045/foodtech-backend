const express=require('express');
const router=express.Router();
const {addRestaurant,getRestaurants,getRestaurantsWithApprove,approveRestaurant,deleteRestaurant, editRestaurant    }=require('../controllers/restaurantController')
const authMiddleware=require('../middleware/authMiddleware')


router.post('/add', authMiddleware, addRestaurant);

// Get all restaurants (for customers)
router.get('/', getRestaurants);


// Get all approved restaurants (for customers)
router.get('/approveRestaurant', getRestaurantsWithApprove);


// Admin approves/rejects restaurant
router.post('/approve', authMiddleware, approveRestaurant);
router.delete('/deleteRestaurant', authMiddleware, deleteRestaurant);
router.put('/editRestaurant',authMiddleware,editRestaurant)


module.exports=router;