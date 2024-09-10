import express from "express";
import UserController from "../controllers/users/UserController.js";

const router = express.Router();

router.get('/users', UserController);

export default router;
