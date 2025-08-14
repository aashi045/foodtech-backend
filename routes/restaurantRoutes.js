const express=require('express');
const router=express.Router();
const {addRestaurant,getRestaurants,getRestaurantsWithApprove,approveRestaurant,deleteRestaurant    }=require('../controllers/restaurantController')
const authMiddleware=require('../middleware/authMiddleware')

console.log({ addRestaurant, getRestaurants, getRestaurantsWithApprove, approveRestaurant },'route=======>>')
    console.log(typeof authMiddleware);
// Vendor adds/updates restaurant
router.post('/add', authMiddleware, addRestaurant);

// Get all restaurants (for customers)
router.get('/', getRestaurants);


// Get all approved restaurants (for customers)
router.get('/approveRestaurant', getRestaurantsWithApprove);


// Admin approves/rejects restaurant
router.post('/approve', authMiddleware, approveRestaurant);
router.delete('/deleteRestaurant/:id', authMiddleware, deleteRestaurant);


module.exports=router;