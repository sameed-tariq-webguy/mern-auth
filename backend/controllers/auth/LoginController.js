import crypto from 'crypto';
import User from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

const LoginController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error('Error in LoginController:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export default LoginController;
