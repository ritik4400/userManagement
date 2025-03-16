const express = require('express');
const router = express.Router();
const { validateToken , authorizeRoles } = require('../middleware/authMiddleware')

//userRoutes
const {updateData , getUser , createUser , removeData , getAllUser , updateProfile} = require('../controller/userController/userController')
router.post( '/register', createUser );
router.put( '/profile',validateToken , updateProfile );
// router.get('/fetchUsers' ,validateToken ,authorizeRoles('admin') ,  getAllUser);
router.get('/fetchUser/:id' ,validateToken ,authorizeRoles('admin') , getUser);
router.put('/updateData/:id' ,validateToken ,authorizeRoles('admin'), updateData);
router.delete('/deleteUsers/:id' ,validateToken ,authorizeRoles('admin') , removeData);


const {fetchAllUser} = require('../controller/userController/fetchUsers')
router.get('/fetchUsers' ,validateToken ,authorizeRoles('admin') ,  fetchAllUser);

//authRoutes
const {login  , logout} = require('../controller/userController/authController');
router.post('/login' , login)
router.get('/logout' , logout)

//roleRoutes
const { updateRole } = require('../controller/roleController')
router.put('/role/:id' , validateToken , authorizeRoles('superAdmin') ,updateRole )


module.exports = router;

