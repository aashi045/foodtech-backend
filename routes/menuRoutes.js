const express=require('express')
const router=express.Router()
const{addMenu,editMenu,deleteMenu,getMenus}=require('../controllers/menuController')
const authMiddleware = require('../middleware/authMiddleware')



router.post('/add', authMiddleware, addMenu);
router.put('/edit', authMiddleware, editMenu);
router.delete('/deleteMenu', authMiddleware, deleteMenu);
router.get('/', authMiddleware, getMenus);

module.exports=router;