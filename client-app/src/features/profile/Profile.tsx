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
import { ProfileFilters } from './Content/ProfileFilters';
import { useState } from 'react';
import { About } from './Content/About';
import { Photos } from './Content/Photos/Photos';

export const Profile = observer(() => {
    const [activeItem, setActiveItem] = useState<ProfileFilters>('About');
    const { activityStore } = useStore();
    const { loadingInitial } = activityStore;
    const { userStore } = useStore();

    if (loadingInitial) return <LoadingComponent />;

    const showFilteredContent = () => {
        switch (activeItem) {
            case ProfileDic.About:
                return <About />;
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
                                    src={
                                        userStore.user?.image ??
                                        '/assets/user.png'
                                    }
                                />
                            </Item>
                        </GridColumn>
                        <GridColumn width={8}>
                            <Header as="h1">
                                {userStore.user?.displayName}
                            </Header>
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
                        activeMenuItem={(activeMenuName: ProfileFilters) => {
                            setActiveItem(activeMenuName);
                        }}
                    />
                </Grid.Column>
            </Grid>
        </Segment.Group>
    );
});
