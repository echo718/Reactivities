import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import { agent } from '../api/agent';
import { format } from 'date-fns';
import { Pagination } from '../models/pagination';

export default class ActivityStore {
    activityRegistry: Map<string, Activity> = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => a.date!.getTime() - b.date!.getTime()
        );
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy h:ss:mm aa');
                activities[date] = activities[date]
                    ? [...activities[date], activity]
                    : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        );
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const results = await agent.Activities.list();
            runInAction(() => {
                results.data.forEach((activity) => {
                    this.setActivity(activity);
                    this.activityRegistry.set(activity.id, activity);
                });
            });
            this.setPagination(results.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    };

    loadActivity = async (id: string) => {
        this.setLoadingInitial(true);
        let activity = await this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            this.setLoadingInitial(false);
            return activity;
        } else {
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    private getActivity = async (id: string) => {
        return this.activityRegistry.get(id);
    };

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);

                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);

                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            });
            return error;
        }
    };

    // soft delete only, set isCancelled to true when delete
    // deleteActivity = async (id: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.Activities.delete(id);
    //         runInAction(() => {
    //             this.activityRegistry.delete(id);
    //             this.loading = false;
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         runInAction(() => {
    //             this.loading = false;
    //         });
    //     }
    // };

    attendActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.attend(id);
            runInAction(() => {
                //this.activityRegistry.set(activity.id, activity);
                //this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    updateActivityStatus = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.cancel(id);
            runInAction(() => {
                //this.activityRegistry.set(activity.id, activity);
                //this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    clearSelectedActivity = () => {
        this.selectedActivity = undefined;
    };
}
