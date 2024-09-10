import express from "express";
import ForgotPasswordController from "../controllers/auth/ForgotPasswordController.js";
import LoginController from "../controllers/auth/LoginController.js";
import RegisterController from "../controllers/auth/RegisterController.js";
import ResetPasswordController from "../controllers/auth/ResetPasswordController.js";

const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);

// router.post('/forgot-password', ForgotPasswordController);

// router.post('/reset-password', (req, res) => {
//     const resetPasswordController = new ResetPasswordController();
//     resetPasswordController.handle(req, res);
// });

export default router;
