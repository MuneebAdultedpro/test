import {
    addExplore,
    findAllExplores,
    findExploreById,
    findExploreByIdAndUpdate,
    removeExplore,
} from '../../database/db.explore';

const createExplore = async (req: any) => {
    try {
        const newExplore = await addExplore(req?.body);
        if (newExplore) {
            return {
                explore: newExplore,
                message: 'new Explore created successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'error creating Explore',
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

const updateExplore = async (req: any) => {
    try {
        const exploreId = req?.query?.exploreId;
        const updatedExplore = await findExploreByIdAndUpdate(
            exploreId,
            req?.body
        );
        if (updatedExplore) {
            return {
                explore: updatedExplore,
                message: 'Explore updated successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error creating Explore',
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

const getExploreById = async (req: any) => {
    try {
        const exploreId = req?.query?.exploreId;
        const explore = await findExploreById(exploreId);
        if (explore) {
            return {
                explore,
                message: 'Explore retrieved successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error retreiving Explore',
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

const deleteExplore = async (req: any) => {
    try {
        const exploreId = req?.query?.exploreId;
        const deletedExplore = await removeExplore(exploreId);
        if (deletedExplore) {
            return {
                explore: deletedExplore,
                message: 'Explore deleted successflly',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error deleting Explore',
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

const getAllExplores = async (req: any) => {
    try {
        const cuisineType = req?.query?.cuisineType as string;
        const search = req?.query?.search as string;
        const type = req?.query?.type as string;
        const location = req?.query?.location;
        const page = parseInt(req?.query?.page as string);
        const limit = parseInt(req?.query?.limit as string);

        const { explores, totalExplores, totalPages, currentPage } =
            await findAllExplores(
                page,
                limit,
                cuisineType,
                location,
                search,
                type
            );

        if (explores) {
            return {
                success: true,
                message: 'Explores retrieved successfully',
                statusCode: 200,
                explores,
                totalExplores,
                totalPages,
                currentPage,
            };
        } else {
            return {
                success: false,
                message: 'error in retrieving evenst',
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
    createExplore,
    updateExplore,
    getAllExplores,
    getExploreById,
    deleteExplore,
};
