import { Attendee } from '../../../app/models/activity';
import { Image, List, ListItem, Popup } from 'semantic-ui-react';
import { ProfileCard } from '../../common/ProfileCard';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

interface Props {
    attendees: Attendee[];
}

export const ActivityAttendees = ({ attendees }: Props) => {
    const { profileStore, userStore } = useStore();
    const { profile } = profileStore;
    const { user } = userStore;
    return (
        <List horizontal>
            {attendees.map((attendee: Attendee) => (
                <ListItem key={attendee.userName}>
                    <Popup
                        content={
                            <ProfileCard
                                profileImage={attendee.image}
                                profileDisplayName={attendee.displayName}
                                followUserName={attendee.userName}
                                profileFollowCount={attendee.followersCount}
                                profile={profile}
                                user={user}
                            />
                        }
                        trigger={
                            <Image
                                src={attendee.image ?? '/assets/user.png'}
                                size="mini"
                                circular
                            />
                        }
                        mouseLeaveDelay={5000}
                    ></Popup>
                </ListItem>
            ))}
        </List>
    );
};
