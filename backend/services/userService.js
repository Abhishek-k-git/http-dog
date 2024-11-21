import User from '../models/userModel.js';
import { ValidationError, AuthenticationError } from '../utils/errors.js';
import generateToken from '../utils/generateToken.js';
import logger from '../utils/logger.js';

class UserService {
    async registerUser(name, email, password) {
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new ValidationError('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (!user) {
            throw new ValidationError('Invalid user data');
        }

        logger.info(`New user registered: ${user._id}`);

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        };
    }

    async loginUser(email, password) {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            logger.info(`User logged in: ${user._id}`);
            
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            };
        }

        throw new AuthenticationError('Invalid email or password');
    }

    async getUserProfile(userId) {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            throw new ValidationError('User not found');
        }

        return user;
    }

    async updateUserProfile(userId, userData) {
        const user = await User.findById(userId);

        if (!user) {
            throw new ValidationError('User not found');
        }

        user.name = userData.name || user.name;
        user.email = userData.email || user.email;
        
        if (userData.password) {
            user.password = userData.password;
        }

        const updatedUser = await user.save();
        logger.info(`User profile updated: ${user._id}`);

        return {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        };
    }
}

export default new UserService();
