import { agent } from '../../../app/api/agent';
import { Profile } from '../../../app/models/user';

export const getProfileImage = async (profileName: string) => {
    const userProfile: Profile = (await agent.Profile.get(
        profileName
    )) as Profile;

    return userProfile.image;
};
