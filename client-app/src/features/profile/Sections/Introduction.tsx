import { observer } from 'mobx-react-lite';
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
import { useState } from 'react';
import { Profile, User } from '../../../app/models/user';

interface IntroductionProps {
    currentProfileImageUrl: string | null;
    currentPageProfileUserName: string;
    profile: Profile | null;
    user: User | null;
}

export const Introduction = observer((props: IntroductionProps) => {
    const [showFollow, setShowFollow] = useState(true);

    return (
        <Segment>
            {' '}
            <Grid divided="vertically">
                <GridRow columns={4}>
                    <GridColumn>
                        <Item>
                            <Item.Image
                                size="large"
                                circular
                                src={props.currentProfileImageUrl}
                            />
                        </Item>
                    </GridColumn>
                    <GridColumn width={8}>
                        <List divided relaxed>
                            <ListItem>
                                <ListContent>
                                    <ListHeader>User Name</ListHeader>
                                    <ListDescription>
                                        {props.currentPageProfileUserName}
                                    </ListDescription>
                                </ListContent>
                            </ListItem>
                            <ListItem>
                                <ListContent>
                                    <ListHeader>Display Name</ListHeader>
                                    <ListDescription>
                                        {props.profile?.displayName}
                                    </ListDescription>
                                </ListContent>
                            </ListItem>
                            <ListItem>
                                <ListContent>
                                    <ListHeader>Description</ListHeader>
                                    <ListDescription>
                                        {props.profile?.bio}
                                    </ListDescription>
                                </ListContent>
                            </ListItem>
                        </List>
                    </GridColumn>
                    <Segment basic textAlign="center">
                        <Statistic
                            size="small"
                            label="Followers"
                            value={props.profile?.followersCount}
                        />
                        <Statistic
                            size="small"
                            label="Following"
                            value={props.profile?.followingCount}
                        />

                        {props.profile?.userName != props.user?.userName && (
                            <>
                                <Divider section />
                                <div>
                                    <Button
                                        size="huge"
                                        color="teal"
                                        fluid
                                        animated
                                    >
                                        <ButtonContent visible>
                                            Following
                                        </ButtonContent>
                                        {showFollow ? (
                                            <ButtonContent
                                                hidden
                                                color="green"
                                                basic
                                                onClick={() =>
                                                    setShowFollow(false)
                                                }
                                            >
                                                Follow
                                            </ButtonContent>
                                        ) : (
                                            <ButtonContent
                                                hidden
                                                onClick={() =>
                                                    setShowFollow(true)
                                                }
                                            >
                                                unFollow
                                            </ButtonContent>
                                        )}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Segment>
                </GridRow>
            </Grid>
        </Segment>
    );
});
