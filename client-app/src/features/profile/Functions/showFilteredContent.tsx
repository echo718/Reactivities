import { Profile, User } from '../../../app/models/user';
import { About } from '../Sections/ProfileFilters/About/About';
import { Events } from '../Sections/ProfileFilters/Events/Events';
import { Follows } from '../Sections/ProfileFilters/Followings/Follows';
import { Photos } from '../Sections/ProfileFilters/Photos/Photos';
import { FollowingTypes, ProfileCategories, ProfileDic } from './profileDics';

export const showFilteredContent = (
    activeItem: ProfileCategories,
    currentPageProfileUserName: string,
    profile: Profile | null,
    isHostLogin: boolean,
    hostUserProfile: Profile | null,
    user: User | null,
    events: Event[] | null,
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
            return (
                <Events
                    currentPageProfileUserName={currentPageProfileUserName}
                    events={events}
                />
            );
        case ProfileDic.Followers:
            return (
                <Follows
                    follows={followers}
                    currentPageProfileUserName={currentPageProfileUserName}
                    followingType={FollowingTypes.Followers}
                    profile={profile}
                    user={user}
                />
            );
        case ProfileDic.Followings:
            return (
                <Follows
                    follows={followings}
                    currentPageProfileUserName={currentPageProfileUserName}
                    followingType={FollowingTypes.Followings}
                    profile={profile}
                    user={user}
                />
            );
    }
};
