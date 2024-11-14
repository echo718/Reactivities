import { Attendee } from '../../../app/models/activity';
import { Image, List, ListItem, Popup } from 'semantic-ui-react';
import { AttendeeCard } from './AttendeeCard';
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
                        {' '}
                        <Popup
                            content={<AttendeeCard attendee={attendee} />}
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
