import { Profile } from '../../../app/models/user';
import { About } from '../Filters/About/About';
import { Follows } from '../Filters/Followings/Follows';
import { Photos } from '../Filters/Photos/Photos';
import { FollowingTypes, ProfileCategories, ProfileDic } from './profileDics';

export const showFilteredContent = (
    activeItem: ProfileCategories,
    currentPageProfileUserName: string,
    profile: Profile | null,
    isHostLogin: boolean,
    hostUserProfile: Profile | null,
    bio?: string,
    followers?: Profile[],
    followings?: Profile[]
) => {
    switch (activeItem) {
        case ProfileDic.About:
            return (
                <About
                    userName={currentPageProfileUserName}
                    bio={bio}
                    displayName={profile?.displayName}
                    isHostLogin={isHostLogin}
                />
            );
        case ProfileDic.Photos:
            return <Photos profile={hostUserProfile} />;
        case ProfileDic.Events:
            return <div>events</div>;
        case ProfileDic.Followers:
            return (
                <Follows
                    follows={followers}
                    currentPageProfileUserName={currentPageProfileUserName}
                    followingType={FollowingTypes.Followers}
                />
            );
        case ProfileDic.Followings:
            return (
                <Follows
                    follows={followings}
                    currentPageProfileUserName={currentPageProfileUserName}
                    followingType={FollowingTypes.Followings}
                />
            );
    }
};
