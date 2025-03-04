import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '30%',
    left: '5%',
    width: '100%',
    color: 'white'
};

interface Props {
    activity: Activity;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
    const {
        userStore: { user },
        activityStore
    } = useStore();

    const isExistInActivity = (username?: string) => {
        const activityAttendeeUserNames: string[] = [];
        activity.attendees.map((attendee) => {
            activityAttendeeUserNames.push(attendee.userName);
        });

        if (username) {
            return activityAttendeeUserNames.includes(username);
        }
        return false;
    };

    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Segment raised>
                    {activity.isCancelled && (
                        <Label as="a" color="red" ribbon>
                            Cancelled
                        </Label>
                    )}
                    <Image
                        src={`/assets/categoryImages/${activity.category?.toLowerCase()}.jpg`}
                        //fluid
                        style={activityImageStyle}
                    />
                </Segment>

                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content verticalAlign="middle">
                                <Header
                                    size="huge"
                                    content={activity.title}
                                    style={{
                                        color: 'white'
                                    }}
                                />
                                <p>
                                    {format(
                                        activity.date!,
                                        'dd MMM yyyy h:mm aa'
                                    )}
                                </p>
                                <p>
                                    Hosted by{' '}
                                    <strong>{activity.hostUserName}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            {activity.isCancelled ? (
                <Segment clearing attached="bottom">
                    <Button
                        color="teal"
                        onClick={() => {
                            activityStore.updateActivityStatus(activity.id);
                        }}
                        disabled={
                            activity.hostUserName.toLocaleLowerCase() !==
                            user?.userName.toLocaleLowerCase()
                        }
                    >
                        Re-Activity activity
                    </Button>
                </Segment>
            ) : (
                <Segment clearing attached="bottom">
                    <Button
                        color="teal"
                        disabled={isExistInActivity(user?.userName)}
                        onClick={() => {
                            activityStore.attendActivity(activity.id);
                        }}
                    >
                        Join Activity
                    </Button>
                    <Button
                        disabled={!isExistInActivity(user?.userName)}
                        onClick={() => {
                            activityStore.updateActivityStatus(activity.id);
                        }}
                    >
                        Cancel attendance
                    </Button>
                    {activity.hostUserName.toLocaleLowerCase() ===
                        user?.displayName.toLocaleLowerCase() && (
                        <Button
                            color="orange"
                            floated="right"
                            as={Link}
                            to={`/manage/${activity.id}`}
                        >
                            Manage Event
                        </Button>
                    )}
                </Segment>
            )}
        </Segment.Group>
    );
});
