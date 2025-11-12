import {
    addFavorite,
    findAllFavoritesByUser,
    findFavoriteById,
    findFavoriteByIdAndUpdate,
    removeFavorite,
} from '../../database/db.favorite';

const createFavorite = async (req: any) => {
    try {
        const newFavorite = await addFavorite(req?.body);
        if (newFavorite) {
            return {
                favorite: newFavorite,
                message: 'new Favorite created successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'error creating Favorite',
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

const updateFavorite = async (req: any) => {
    try {
        const favoriteId = req?.query?.favoriteId;
        const updatedFavorite = await findFavoriteByIdAndUpdate(
            favoriteId,
            req?.body
        );
        if (updatedFavorite) {
            return {
                favorite: updatedFavorite,
                message: 'Favorite updated successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error creating Favorite',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error,
        };
    }
};

const getFavoriteById = async (req: any) => {
    try {
        const favoriteId = req?.query?.favoriteId;
        const favorite = await findFavoriteById(favoriteId);
        if (favorite) {
            return {
                favorite,
                message: 'Favorite retrieved successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error retreiving Favorite',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error,
        };
    }
};

const deleteFavorite = async (req: any) => {
    try {
        const itemId = req?.query?.itemId;
        const userId = req?.query?.userId;
        const deletedFavorite = await removeFavorite(itemId, userId);
        if (deletedFavorite) {
            return {
                favorite: deletedFavorite,
                message: 'Favorite deleted successflly',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error deleting Favorite',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error,
        };
    }
};

const getAllFavorites = async (req: any) => {
    try {
        const userId = req?.query?.userId as string;
        const name = req?.query?.name as string;
        const page = parseInt(req?.query?.page as string);
        const limit = parseInt(req?.query?.limit as string);

        const { favorites, totalFavorites, totalPages, currentPage } =
            await findAllFavoritesByUser(userId, page, limit, name);

        if (favorites) {
            return {
                success: true,
                message: 'favorites retrieved successfully',
                statusCode: 200,
                favorites,
                totalFavorites,
                totalPages,
                currentPage,
            };
        } else {
            return {
                success: false,
                message: 'error in retrieving favorites',
                statusCode: 400,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
            statusCode: 500,
        };
    }
};

export {
    createFavorite,
    updateFavorite,
    getAllFavorites,
    getFavoriteById,
    deleteFavorite,
};
