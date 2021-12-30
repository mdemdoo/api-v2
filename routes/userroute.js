
const express =require('express');
const router=express.Router()
const {register,login,allUseres,getUser,updateUser  }=require('../controller/users');
const { verifyAuthrisation } = require('../middleware/upload');



//register 
router.route('/registerUser').post(register)
//login
router.route('/loginUser').post(login)

router.route('/getUsers').get(allUseres),

router.route('user').post(getUser)

router.route('/:id').put(verifyAuthrisation,updateUser)

module.exports = router;