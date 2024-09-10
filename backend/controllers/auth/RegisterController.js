import User from '../../models/userModel.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const RegisterController = async (req, res) => {
    console.log(req.body);
    
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'User registered successfully', status : true, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export default RegisterController;