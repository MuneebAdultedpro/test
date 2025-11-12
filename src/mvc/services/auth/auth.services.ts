import { Request } from 'express';
import { findUserByEmail, createUser } from '../../database/db.user';
import { Role } from '../../../interfaces/types';

const jwt = require('jsonwebtoken');

const loginUser = async (req: Request) => {
    try {
        const { email } = req?.body;

        if (!email) {
            return {
                message: 'Missing required field: email',
                statusCode: 400,
                success: false,
            };
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return {
                success: false,
                statusCode: 500,
                message: "User with the given email doesn't exist",
            };
        }

        // default case
        const payload = {
            id: user._id,
        };

        const token = jwt.sign(payload, process?.env?.JWT_KEY as string);

        return {
            user: user,
            message: 'Logged In Successfully',
            statusCode: 200,
            success: true,
            token: token,
        };
    } catch (error) {
        throw new Error('Internal Server Error at service level');
    }
};

const registerUser = async (req: Request) => {
    try {
        const { email } = req.body;

        if (!email) {
            //|| !user
            return {
                success: false,
                statusCode: 400,
                message: 'Missing required field: email',
            };
        }

        // User flow
        const preUser = await findUserByEmail(email);
        if (preUser) {
            return {
                success: false,
                statusCode: 500,
                message: 'User already exists',
            };
        }

        const newUser = await createUser({
            ...req.body,
        });

        const payload = { id: newUser._id };
        const token = jwt.sign(payload, process?.env?.JWT_KEY as string);

        return {
            user: newUser,
            message: 'New User registered successfully',
            statusCode: 200,
            success: true,
            token,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Error registering user',
            error,
        };
    }
};

export { loginUser, registerUser };
