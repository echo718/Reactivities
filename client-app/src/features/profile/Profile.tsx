import {
    Button,
    Divider,
    Grid,
    GridColumn,
    GridRow,
    Header,
    Item,
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

export const Profile = observer(() => {
    const urlDirectors = location.pathname.split('/');
    const urlName = urlDirectors[urlDirectors.length - 1].toLocaleLowerCase();

    const [activeItem, setActiveItem] = useState<ProfileCategories>(
        ProfileDic.About as ProfileCategories
    );
    const { profileStore, userStore } = useStore();
    const {
        loadingProfile,
        getProfileImage,
        profileImage,
        loadPhotos,
        profile
    } = profileStore;
    const { getCurrentUser, user } = userStore;

    const showFilteredContent = () => {
        switch (activeItem) {
            case ProfileDic.About:
                return <div>{urlName}</div>;
            case ProfileDic.Photos:
                return <Photos profile={profile} />;
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
        getProfileImage(urlName);
        loadPhotos();
    }, []);

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
                                    src={profileImage}
                                />
                            </Item>
                        </GridColumn>
                        <GridColumn width={8}>
                            <Header as="h1">{urlName}</Header>
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
                                <Button size="huge" color="teal" fluid>
                                    Following
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
                        hostDisplayName={user?.displayName.toLocaleLowerCase()}
                    />
                </Grid.Column>
            </Grid>
        </Segment.Group>
    );
});
