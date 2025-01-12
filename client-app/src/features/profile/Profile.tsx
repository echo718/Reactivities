import { Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { useEffect, useState } from 'react';
import {
    ProfileDic,
    ProfileCategories,
    FollowingTypes,
    EventsCategories
} from './Functions/profileDics';
import { Introduction } from './Sections/Introduction/Introduction';
import { showFilteredContent } from './Functions/showFilteredContent';
import { ProfileFilters } from './Sections/ProfileFilters/ProfileFilters';

export const Profile = observer(() => {
    const urlDirectors = location.pathname.split('/');
    const currentPageProfileUserName =
        urlDirectors[urlDirectors.length - 1].toLocaleLowerCase();
    const [isHostLogin, setIsHostLogin] = useState<boolean>(false);
    const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState<
        string | null
    >(null);

    const [activeItem, setActiveItem] = useState<ProfileCategories>(
        ProfileDic.About as ProfileCategories
    );
    const { profileStore, userStore } = useStore();
    const {
        loadingProfile,
        getUserProfileImage,
        profileImage,
        loadHostUserProfile,
        profile,
        hostUserProfile,
        getBio,
        bio,
        loadCurrentPageUserProfile,
        getFollows: getFollowings,
        followings,
        followers,
        getEvents,
        renderedEvents: events
    } = profileStore;
    const { getCurrentUser, user } = userStore;

    useEffect(() => {
        getCurrentUser();
        loadHostUserProfile();
        loadCurrentPageUserProfile(currentPageProfileUserName);
        getUserProfileImage(currentPageProfileUserName);
        getBio(currentPageProfileUserName);
        getFollowings(currentPageProfileUserName, FollowingTypes.Followings);
        getFollowings(currentPageProfileUserName, FollowingTypes.Followers);
        getEvents(currentPageProfileUserName, 'future' as EventsCategories);
    }, []);

    useEffect(() => {
        const isHost = user?.userName === currentPageProfileUserName;
        const currentProfileImageUrlOnHost =
            hostUserProfile?.image ?? '/assets/user.png';
        const currentProfileImageUrlOnUser = profileImage ?? '/assets/user.png';

        setIsHostLogin(isHost);
        setCurrentProfileImageUrl(
            isHost ? currentProfileImageUrlOnHost : currentProfileImageUrlOnUser
        );
    }, [loadingProfile, user, hostUserProfile]);

    if (loadingProfile || !currentProfileImageUrl || !profile)
        return <LoadingComponent content="Loading profile" />;

    return (
        <Segment.Group>
            <Introduction
                currentProfileImageUrl={currentProfileImageUrl}
                currentPageProfileUserName={currentPageProfileUserName}
                profile={profile}
                user={user}
                isHost={isHostLogin}
            />
            <Grid>
                <Grid.Column width="10">
                    <Segment
                        style={{
                            width: '100%',
                            marginTop: '4%'
                        }}
                    >
                        {showFilteredContent(
                            activeItem,
                            currentPageProfileUserName,
                            profile,
                            isHostLogin,
                            hostUserProfile,
                            user,
                            events,
                            bio,
                            followers,
                            followings
                        )}
                    </Segment>
                </Grid.Column>
                <Grid.Column width="6">
                    <ProfileFilters
                        activeItem={activeItem}
                        activeMenuItem={(activeMenuName) => {
                            setActiveItem(activeMenuName);
                        }}
                        hostUserName={user?.userName.toLocaleLowerCase()}
                    />
                </Grid.Column>
            </Grid>
        </Segment.Group>
    );
});
