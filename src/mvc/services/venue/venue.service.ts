import {
    addVenue,
    findAllVenues,
    findVenueById,
    findVenueByIdAndUpdate,
    removeVenue,
} from '../../database/db.venue';

const createVenue = async (req: any) => {
    try {
        const newVenue = await addVenue(req?.body);
        if (newVenue) {
            return {
                venue: newVenue,
                message: 'new venue created successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'error creating venue',
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

const updateVenue = async (req: any) => {
    try {
        const venueId = req?.query?.venueId;
        const updatedVenue = await findVenueByIdAndUpdate(venueId, req?.body);
        if (updatedVenue) {
            return {
                venue: updatedVenue,
                message: 'venue updated successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error creating venue',
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

const getVenueById = async (req: any) => {
    try {
        const venueId = req?.query?.venueId;
        const venue = await findVenueById(venueId);
        if (venue) {
            return {
                venue,
                message: 'venue retrieved successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error retreiving venue',
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

const deleteVenue = async (req: any) => {
    try {
        const venueId = req?.query?.venueId;
        const deletedVenue = await removeVenue(venueId);
        if (deletedVenue) {
            return {
                venue: deletedVenue,
                message: 'venue deleted successflly',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error deleting venue',
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

const getAllVenues = async (req: any) => {
    try {
        const venue = req?.query?.venue as string;
        const page = parseInt(req?.query?.page as string);
        const limit = parseInt(req?.query?.limit as string);

        const { venues, totalVenues, totalPages, currentPage } =
            await findAllVenues(page, limit, venue);

        if (venues) {
            return {
                success: true,
                message: 'venues retrieved successfully',
                statusCode: 200,
                venues,
                totalVenues,
                totalPages,
                currentPage,
            };
        } else {
            return {
                success: false,
                message: 'error in retrieving venues',
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

export { createVenue, updateVenue, getAllVenues, getVenueById, deleteVenue };
