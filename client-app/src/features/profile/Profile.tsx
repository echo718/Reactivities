import {
    Button,
    ButtonContent,
    Divider,
    Grid,
    GridColumn,
    GridRow,
    Item,
    List,
    ListContent,
    ListDescription,
    ListHeader,
    ListItem,
    Segment,
    Statistic
} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { ProfileFilters } from './Filters/ProfileFilters';
import { useEffect, useState } from 'react';
import { Photos } from './Filters/Photos/Photos';
import { ProfileDic, ProfileCategories } from './Functions/profileDics';
import { About } from './Filters/About/About';

export const Profile = observer(() => {
    const urlDirectors = location.pathname.split('/');
    const currentPageProfileUserName =
        urlDirectors[urlDirectors.length - 1].toLocaleLowerCase();
    const [isHostLogin, setIsHostLogin] = useState<boolean>(false);
    const [currentProfileImageUrl, setCurrentProfileImageUrl] =
        useState<string>();

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
        loadCurrentPageUserProfile
    } = profileStore;
    const { getCurrentUser, user } = userStore;
    const [showFollow, setShowFollow] = useState(true);

    const showFilteredContent = () => {
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
                return <div>Followers</div>;
            case ProfileDic.Followings:
                return <div>Followings</div>;
        }
    };

    useEffect(() => {
        getCurrentUser();
        loadHostUserProfile();
        loadCurrentPageUserProfile(currentPageProfileUserName);
        getUserProfileImage(currentPageProfileUserName);
        getBio(currentPageProfileUserName);
    }, []);

    useEffect(() => {
        const isHost = user?.userName === currentPageProfileUserName;
        const currentProfileImageUrlOnHost = hostUserProfile?.image;
        const currentProfileImageUrlOnUser = profileImage;

        setIsHostLogin(isHost);
        setCurrentProfileImageUrl(
            isHost ? currentProfileImageUrlOnHost : currentProfileImageUrlOnUser
        );
    }, [loadingProfile, user, hostUserProfile]);

    if (loadingProfile) return <LoadingComponent content="Loading profile" />;

    return (
        <Segment.Group>
            <Segment>
                <Grid divided="vertically">
                    <GridRow columns={4}>
                        <GridColumn>
                            <Item>
                                <Item.Image
                                    size="large"
                                    circular
                                    src={currentProfileImageUrl}
                                />
                            </Item>
                        </GridColumn>
                        <GridColumn width={8}>
                            {/* <Header as="h1">
                                User Name: {currentPageProfileUserName}
                                <br />
                                Display Name: {profile?.displayName}
                                <br />
                            </Header> */}
                            <List divided relaxed>
                                <ListItem>
                                    <ListContent>
                                        <ListHeader>User Name</ListHeader>
                                        <ListDescription>
                                            {currentPageProfileUserName}
                                        </ListDescription>
                                    </ListContent>
                                </ListItem>
                                <ListItem>
                                    <ListContent>
                                        <ListHeader>Display Name</ListHeader>
                                        <ListDescription>
                                            {profile?.displayName}
                                        </ListDescription>
                                    </ListContent>
                                </ListItem>
                                <ListItem>
                                    <ListContent>
                                        <ListHeader>Description</ListHeader>
                                        <ListDescription>
                                            {profile?.bio}
                                        </ListDescription>
                                    </ListContent>
                                </ListItem>
                            </List>
                        </GridColumn>
                        <Segment basic textAlign="center">
                            <Statistic
                                size="small"
                                label="Followers"
                                value="5"
                            />
                            <Statistic
                                size="small"
                                label="Following"
                                value="34"
                            />
                            <Divider section />
                            <div>
                                <Button size="huge" color="teal" fluid animated>
                                    <ButtonContent visible>
                                        Following
                                    </ButtonContent>
                                    {showFollow ? (
                                        <ButtonContent
                                            hidden
                                            color="green"
                                            basic
                                            onClick={() => setShowFollow(false)}
                                        >
                                            Follow
                                        </ButtonContent>
                                    ) : (
                                        <ButtonContent
                                            hidden
                                            onClick={() => setShowFollow(true)}
                                        >
                                            unFollow
                                        </ButtonContent>
                                    )}
                                </Button>
                            </div>
                        </Segment>
                    </GridRow>
                </Grid>
            </Segment>
            <Grid>
                <Grid.Column width="10">
                    <Segment
                        style={{
                            width: '100%',
                            marginTop: '4%',
                            minHeight: '260px'
                        }}
                    >
                        {' '}
                        {showFilteredContent()}
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
