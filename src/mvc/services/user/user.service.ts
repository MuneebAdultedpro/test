import { Request } from 'express';
import {
    findAllUsers,
    findUserById,
    findUsers,
    findUserByIdAndUpdate,
    removeUser,
    findUserByEmail,
    registerUser,
} from '../../database/db.user';

const getUser = async (req: any) => {
    try {
        const userId = req?.user?.id as string;
        if (!userId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide userId',
            };
        }
        const user = await findUserById(userId);
        if (!user) {
            return {
                success: false,
                statusCode: 403,
                message: "user With the given id doesn't Exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};

const getUserById = async (req: Request) => {
    try {
        const userId = req?.query?.id as string;
        if (!userId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Please Provide userId',
            };
        }
        const user = await findUserById(userId);
        if (!user) {
            return {
                success: false,
                statusCode: 400,
                message: "user With the given id doesn't Exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};

const getUserByEmail = async (req: Request) => {
    try {
        const email = decodeURIComponent(req?.query?.email as string) as string;
        if (!email) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide email',
            };
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return {
                success: true,
                statusCode: 200,
                message: "user With the given email doesn't Exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};

const deleteUser = async (req: Request) => {
    try {
        const userId = req?.query?.id as string;
        if (!userId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide userId',
            };
        }
        const user = await removeUser(userId);
        if (!user) {
            return {
                success: false,
                statusCode: 403,
                message: "user With the given id doesn't Exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User deleted Successfully successfully',
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};

const getAllUsers = async (req: Request) => {
    try {
        const page = parseInt(req?.query?.page as string) || 1;
        const limit = parseInt(req?.query?.limit as string) || 10;
        const startDate = req?.query?.startDate
            ? new Date(req?.query?.startDate as string)
            : undefined;
        const endDate = req?.query?.endDate
            ? new Date(req?.query?.endDate as string)
            : undefined;
        const search = req?.query?.search as string;

        const { users, totalUsers, totalPages, currentPage } =
            await findAllUsers(page, limit, startDate, endDate, search);

        if (!users.length) {
            return {
                success: false,
                statusCode: 403,
                message: 'No users found',
            };
        }

        return {
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            users,
            totalUsers,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};

const getUsersWithData = async (req: Request) => {
    try {
        const page = parseInt(req?.query?.page as string) || 1;
        const limit = parseInt(req?.query?.limit as string) || 10;
        const startDate = req?.query?.startDate
            ? new Date(req?.query?.startDate as string)
            : undefined;
        const endDate = req?.query?.endDate
            ? new Date(req?.query?.endDate as string)
            : undefined;
        const search = req?.query?.search as string;

        const { users, totalUsers, totalPages, currentPage } = await findUsers(
            page,
            limit,
            startDate,
            endDate,
            search
        );

        if (!users.length) {
            return {
                success: true,
                statusCode: 200,
                message: 'No user found for the given institute ID',
                users: [],
                totalUsers: 0,
                totalPages: 0,
                currentPage: 0,
            };
        }

        return {
            success: true,
            statusCode: 200,
            message: 'Users retrieved successfully',
            users,
            totalUsers,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};

const updateUser = async (req: any) => {
    try {
        const userId = req?.user?.id as string;

        const updateUser = await findUserByIdAndUpdate(userId, req.body);

        if (updateUser) {
            return {
                updateUser: updateUser,
                message: 'User Updated Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error getting Institute',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};

const createUser = async (req: Request) => {
    try {
        const user = await findUserByEmail(req?.body?.email);
        if (user) {
            return {
                user: user,
                message: 'User already available with this email',
                statusCode: 400,
                success: false,
            };
        }

        const newUser = await registerUser(req?.body);

        if (newUser) {
            return {
                user: newUser,
                message: 'New User registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Creating User',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};

export {
    getUser,
    getAllUsers,
    getUsersWithData,
    updateUser,
    deleteUser,
    getUserById,
    createUser,
    getUserByEmail,
};
