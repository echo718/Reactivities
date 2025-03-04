import { Segment, List, Label, Item, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Attendee } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { FollowingTypes } from '../../profile/Functions/profileDics';

interface Props {
    attendees: Attendee[];
    hostUserName: string;
}

export default observer(function ActivityDetailedSidebar({
    attendees,
    hostUserName
}: Props) {
    const { userStore } = useStore();
    const attendeesCount = attendees.length;

    const sortedByDisplayNameAttendees = attendees.slice().sort((a, b) => {
        if (hostUserName.toLowerCase() === a.userName?.toLowerCase()) return -2;
        return a.userName.localeCompare(b.userName);
    });

    const getFollowingType = (attendee: Attendee) => {
        return attendee.following
            ? FollowingTypes.Following
            : FollowingTypes.NotFollowing;
    };
    return (
        <>
            <Segment
                textAlign="center"
                style={{ border: 'none' }}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {attendeesCount ?? 'No'} People Going
            </Segment>
            <Segment attached>
                {sortedByDisplayNameAttendees.map((attendee) => {
                    const isActivityHost =
                        attendee.userName.toLowerCase() ===
                        hostUserName.toLowerCase();
                    const isHostName =
                        userStore.user?.displayName === attendee.displayName;

                    return (
                        <List relaxed divided key={attendee.userName}>
                            <Item
                                style={{
                                    position: 'relative'
                                }}
                            >
                                {isActivityHost ? (
                                    <Label
                                        style={{
                                            position: 'absolute'
                                        }}
                                        color="orange"
                                        ribbon="right"
                                    >
                                        Host
                                    </Label>
                                ) : null}

                                <Image
                                    size="tiny"
                                    src={attendee.image ?? '/assets/user.png'}
                                />
                                <Item.Content verticalAlign="middle">
                                    <Item.Header as="h3">
                                        <Link
                                            to={`/profile/${attendee.userName}`}
                                        >
                                            {attendee.displayName}
                                        </Link>
                                    </Item.Header>
                                    <Item.Extra
                                        style={{
                                            color: 'orange'
                                        }}
                                    >
                                        {isHostName
                                            ? null
                                            : getFollowingType(attendee)}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </List>
                    );
                })}
            </Segment>
        </>
    );
});
