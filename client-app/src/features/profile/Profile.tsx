import {
    Button,
    Divider,
    Grid,
    GridColumn,
    GridRow,
    Header,
    Item,
    ItemContent,
    ItemHeader,
    Segment,
    Statistic,
    StatisticGroup,
    StatisticLabel,
    StatisticValue
} from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { ProfileFilters } from './Content/ProfileFilters';
import { useState } from 'react';
import { About } from './Content/About';
import { Photos } from './Content/Photos';

export const Profile = observer(() => {
    const [activeItem, setActiveItem] = useState('About');
    const { activityStore } = useStore();
    const { loadingInitial } = activityStore;

    const { id } = useParams();
    const { userStore } = useStore();

    if (loadingInitial) return <LoadingComponent />;

    const showFilteredContent = () => {
        switch (activeItem) {
            case 'About':
                return <About />;
            case 'Photos':
                return <Photos />;
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
                        <GridColumn width={8} fluid vertical>
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
                        activeMenuItem={(activeMenuName: string) => {
                            setActiveItem(activeMenuName);
                        }}
                    />
                </Grid.Column>
            </Grid>
        </Segment.Group>
    );
});
