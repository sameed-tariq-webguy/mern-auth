import User from '../../models/userModel.js';

const UserController = async (req, res) => {
    
    try {
        const users = await User.find({} , {password : 0});
        if (!users) {
            return res.status(400).json({ message: 'No Users Found' });
        }

        return res.json({ users });
    } catch (error) {
        console.error('Error in UserController:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export default UserController;
