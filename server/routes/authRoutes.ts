import { Router } from 'express';
import { forgotPassword, login, logout, register, resetPassword, verifyOtp } from '../controller/authController';
const router = Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/verify-otp').post(verifyOtp);
router.route('/reset-password').post(resetPassword);

export default router;