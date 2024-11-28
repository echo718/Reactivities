import { Attendee } from '../../../app/models/activity';
import { Image, List, ListItem, Popup } from 'semantic-ui-react';
import { ProfileCard } from '../../common/ProfileCard';
import { Link } from 'react-router-dom';

interface Props {
    attendees: Attendee[];
}

export const ActivityAttendees = ({ attendees }: Props) => {
    return (
        <List horizontal>
            {attendees.map((attendee: Attendee) => (
                <ListItem key={attendee.userName}>
                    <Link to={`/profile/${attendee.userName}`}>
                        <Popup
                            content={
                                <ProfileCard
                                    profileImage={attendee.image}
                                    profileDisplayName={attendee.displayName}
                                    profileFollowCount={attendee.followersCount}
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
                            style={{ cursor: 'pointer' }}
                        ></Popup>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
};
