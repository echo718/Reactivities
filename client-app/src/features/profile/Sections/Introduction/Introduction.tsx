import { observer } from 'mobx-react-lite';
import {
    Grid,
    GridColumn,
    GridRow,
    Item,
    List,
    ListContent,
    ListDescription,
    ListHeader,
    ListItem,
    Segment
} from 'semantic-ui-react';
import { Profile, User } from '../../../../app/models/user';
import { FollowsAtIntroduction } from './FollowsAtIntroduction';

interface IntroductionProps {
    currentProfileImageUrl: string | null;
    currentPageProfileUserName: string;
    profile: Profile | null;
    user: User | null;
    isHost: boolean;
}

export const Introduction = observer((props: IntroductionProps) => {
    return (
        <Segment>
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
                    <FollowsAtIntroduction
                        profile={props.profile}
                        user={props.user}
                        currentPageProfileUserName={
                            props.currentPageProfileUserName
                        }
                        isHost={props.isHost}
                    />
                </GridRow>
            </Grid>
        </Segment>
    );
});
