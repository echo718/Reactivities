import { makeAutoObservable, runInAction } from 'mobx';
import { agent } from '../api/agent';
import { BasicDetail, Profile } from '../models/user';
import { store } from './store';
import { FollowingTypes } from '../../features/profile/Functions/profileDics';

export default class ProfileStore {
    profile: Profile | null = null;
    hostUserProfile: Profile | null = null;
    profileImage: string | null = '';
    loadingProfile = false;
    loading = false;
    bio: string | undefined = undefined;
    followings: Profile[] | undefined = undefined;
    followers: Profile[] | undefined = undefined;
    followingsCount: number = 0;
    followersCount: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingProfile = (state: boolean) => {
        this.loadingProfile = state;
    };

    loadHostUserProfile = async () => {
        this.setLoadingProfile(true);
        try {
            const hostUser = await agent.Account.current();
            const hostUserProfile: Profile = (await agent.Profile.get(
                hostUser.userName
            )) as Profile;

            runInAction(() => {
                this.hostUserProfile = hostUserProfile;
                store.userStore.setImage(hostUserProfile.image);
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };

    deletePhotos = async (photoId: string) => {
        this.setLoadingProfile(true);
        try {
            await agent.Profile.delete(photoId);
            await this.loadHostUserProfile();
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };

    setMain = async (photoId: string) => {
        this.setLoadingProfile(true);
        try {
            await agent.Profile.setMain(photoId);
            await this.loadHostUserProfile();
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };

    //only host can add photo
    addPhoto = async (photo: object) => {
        this.setLoadingProfile(true);
        try {
            const response = await agent.Profile.add(photo);
            const returedPhoto = response.data;
            runInAction(() => {
                if (this.hostUserProfile) {
                    this.hostUserProfile.photos?.push(returedPhoto);
                    if (returedPhoto.isMain) {
                        //todo: judge is host to show in nav bar
                        store.userStore.setImage(returedPhoto.url);
                        this.hostUserProfile.image = returedPhoto.url;

                        console.log('addPhoto', this.hostUserProfile.image);
                    }
                }
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };

    getUserProfileImage = async (profileName: string) => {
        this.setLoadingProfile(true);
        try {
            const userProfile: Profile = (await agent.Profile.get(
                profileName
            )) as Profile;

            runInAction(() => {
                this.profileImage = userProfile.image;
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };

    getBio = async (userName: string) => {
        this.setLoadingProfile(true);
        try {
            const userProfile: Profile = (await agent.Profile.get(
                userName
            )) as Profile;
            runInAction(() => {
                this.bio = userProfile.bio;
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };

    loadCurrentPageUserProfile = async (userName: string) => {
        this.setLoadingProfile(true);
        try {
            const currentPageUserProfile: Profile = (await agent.Profile.get(
                userName
            )) as Profile;

            runInAction(() => {
                this.profile = currentPageUserProfile;
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };

    updateProfileBasicDetails = async (basicDetails: BasicDetail) => {
        this.setLoadingProfile(true);
        try {
            await agent.Profile.put(basicDetails);
            const hostUser = await agent.Account.current();
            store.userStore.user = hostUser;
            const hostUserProfile: Profile = (await agent.Profile.get(
                hostUser.userName
            )) as Profile;
            runInAction(() => {
                this.hostUserProfile = hostUserProfile;
                this.profile = hostUserProfile;
                this.bio = hostUserProfile.bio;
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };

    getFollows = async (
        currentPageProfileUserName: string,
        followingType: string
    ) => {
        this.setLoadingProfile(true);
        try {
            const followingsProfile: Profile[] =
                (await agent.Profile.getFollowings(
                    currentPageProfileUserName,
                    followingType
                )) as Profile[];

            runInAction(() => {
                if (followingType === FollowingTypes.Followers) {
                    this.followers = followingsProfile;
                } else {
                    this.followings = followingsProfile;
                }
                this.setLoadingProfile(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingProfile(false);
            });
        }
    };
}
