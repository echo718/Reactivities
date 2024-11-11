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
import { getProfileImage } from './Functions/getProfileImage';

export const Profile = observer(() => {
    const urlDirectors = location.pathname.split('/');
    const urlName = urlDirectors[urlDirectors.length - 1].toLocaleLowerCase();

    const [profileName, setProfileName] = useState(urlName);
    const [profileIamge, setProfileImage] = useState<string>();

    const [activeItem, setActiveItem] = useState<ProfileCategories>(
        ProfileDic.About as ProfileCategories
    );
    const { activityStore } = useStore();
    const { loadingInitial } = activityStore;

    if (loadingInitial) return <LoadingComponent />;

    const showFilteredContent = () => {
        switch (activeItem) {
            case ProfileDic.About:
                return <div>{profileName}</div>;
            case ProfileDic.Photos:
                return <Photos />;
            case ProfileDic.Events:
                return <div>events</div>;
            case ProfileDic.Followers:
                return <div>Followers</div>;
            case ProfileDic.Followings:
                return <div>Followings</div>;
        }
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
            const imageUrl = await getProfileImage(profileName);
            setProfileImage(imageUrl ?? '/assets/user.png');
        };

        fetchProfileImage();
    }, []);

    useEffect(() => {
        const urlName =
            urlDirectors[urlDirectors.length - 1].toLocaleLowerCase();
        setProfileName(urlName);
    }, [location]);

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
                                    src={profileIamge}
                                />
                            </Item>
                        </GridColumn>
                        <GridColumn width={8}>
                            <Header as="h1">{profileName}</Header>
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
                    />
                </Grid.Column>
            </Grid>
        </Segment.Group>
    );
});
