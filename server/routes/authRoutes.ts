import { Router } from 'express';
import { getUserById, login, register } from '../controller/authController';
const router = Router();

router.route('/get-user/:id').get(getUserById);

router.route('/login').post(login);
router.route('/register').post(register);

export default router;