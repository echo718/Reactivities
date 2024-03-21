import { makeAutoObservable } from 'mobx';
import { ServerError } from '../models/serverError';
import ActivityStore from './activityStore';

export default class commonStore {
    error: ServerError | null = null;

    constructor() {
        makeAutoObservable: new ActivityStore();
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

}