import { makeAutoObservable, runInAction } from 'mobx';
import { agent } from '../api/agent';
import { Profile } from '../models/user';
import { store } from './store';

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

    setMain = async (photoId: string) => {
        this.loadingProfile = true;
        try {
            await agent.Profile.setMain(photoId);
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

    addPhoto = async (photo: object) => {
        this.loadingProfile = true;
        try {
            const response = await agent.Profile.add(photo);
            const returedPhoto = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(returedPhoto);
                    if (returedPhoto.isMain) {
                        //  store.userStore.setImage(returedPhoto.url);
                        this.profile.image = returedPhoto.url;
                    }
                }
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
