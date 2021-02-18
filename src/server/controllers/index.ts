import { UserController } from './UserController';
import {MoodController} from './MoodController';
import {MoodConfigController} from './MoodConfigController';
import {Request} from './CrudController'

const userController = new UserController();
const moodController = new MoodController();
const moodConfigController = new MoodConfigController();

export {
    userController,
    moodController,
    moodConfigController
};