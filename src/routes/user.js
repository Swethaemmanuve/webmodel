import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from '../controllers/userController';

router.get('/users', getAllUsers);
router.get('/edituser/:id', getUserById);
router.post('/adduser', addUser);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);

export default router;
