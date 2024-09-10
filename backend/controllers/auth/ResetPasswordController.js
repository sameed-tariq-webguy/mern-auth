import User from '../../models/userModel.js';
import bcrypt from 'bcryptjs';

const ResetPasswordController = async (req, res) => {
    const { token } = req.params;
    const { password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export default ResetPasswordController;