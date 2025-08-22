const express=require('express')
const router=express.Router()
const{createOrder,getMyOrders,getVendorOrders,deleteOrder,updateStatus}=require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')



router.post('/add', authMiddleware, createOrder);
router.put('/update-status', authMiddleware, updateStatus);
router.get('/my-order', authMiddleware, getMyOrders);
router.get('/', authMiddleware, getVendorOrders);
router.delete('/delete', authMiddleware, deleteOrder);

module.exports=router;