import { makeAutoObservable, runInAction } from 'mobx';
import { agent } from '../api/agent';
import { Profile } from '../models/user';

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadPhotos = async () => {
        this.loadingProfile = true;
        try {
            const user = await agent.Account.current();
            const userProfile: Profile = (await agent.Profile.get(
                user.userName
            )) as Profile;

            runInAction(() => {
                this.profile = userProfile;
                this.loadingProfile = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingProfile = false;
            });
        }
    };

    deletePhotos = async (photoId: string) => {
        this.loadingProfile = true;
        try {
            await agent.Profile.delete(photoId);
            await this.loadPhotos();
            runInAction(() => {
                this.loadingProfile = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingProfile = false;
            });
        }
    };
}
