import List from '../models/listModel.js';
import { ValidationError, AuthorizationError, NotFoundError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class ListService {
    async getLists(userId) {
        const lists = await List.find({ user: userId });
        return lists;
    }

    async createList(userId, { name, statusCodes }) {
        const list = new List({
            user: userId,
            name,
            statusCodes: statusCodes || [],
        });

        const createdList = await list.save();
        logger.info(`New list created: ${createdList._id} by user: ${userId}`);
        
        return createdList;
    }

    async getListById(listId, userId) {
        const list = await List.findById(listId);

        if (!list) {
            throw new NotFoundError('List not found');
        }

        // Check if the list belongs to the user
        if (list.user.toString() !== userId.toString()) {
            logger.warn(`Unauthorized access attempt to list ${listId} by user ${userId}`);
            throw new AuthorizationError('Not authorized to access this list');
        }

        return list;
    }

    async updateList(listId, userId, updateData) {
        const list = await this.getListById(listId, userId);

        list.name = updateData.name || list.name;
        list.statusCodes = updateData.statusCodes || list.statusCodes;

        const updatedList = await list.save();
        logger.info(`List updated: ${listId} by user: ${userId}`);

        return updatedList;
    }

    async deleteList(listId, userId) {
        const list = await this.getListById(listId, userId);
        
        await list.remove();
        logger.info(`List deleted: ${listId} by user: ${userId}`);
        
        return { message: 'List removed' };
    }

    async addStatusCode(listId, userId, statusCode) {
        const list = await this.getListById(listId, userId);

        if (list.statusCodes.includes(statusCode)) {
            throw new ValidationError('Status code already exists in the list');
        }

        list.statusCodes.push(statusCode);
        const updatedList = await list.save();
        logger.info(`Status code ${statusCode} added to list: ${listId}`);

        return updatedList;
    }

    async removeStatusCode(listId, userId, statusCode) {
        const list = await this.getListById(listId, userId);

        const index = list.statusCodes.indexOf(statusCode);
        if (index === -1) {
            throw new ValidationError('Status code not found in the list');
        }

        list.statusCodes.splice(index, 1);
        const updatedList = await list.save();
        logger.info(`Status code ${statusCode} removed from list: ${listId}`);

        return updatedList;
    }
}

export default new ListService();
