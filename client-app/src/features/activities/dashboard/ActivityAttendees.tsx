import { Attendee } from '../../../app/models/activity';
import { Image, List, ListItem, Popup } from 'semantic-ui-react';
import { AttendeeCard } from './AttendeeCard';

interface Props {
    attendees: Attendee[];
}

export const ActivityAttendees = ({ attendees }: Props) => {
    return (
        <List horizontal>
            {attendees.map((attendee: Attendee) => (
                <ListItem key={attendee.userName}>
                    <Popup
                        content={<AttendeeCard attendee={attendee} />}
                        trigger={
                            <Image
                                src={attendee.image ?? '/assets/user.png'}
                                size="mini"
                                circular
                            />
                        }
                    ></Popup>
                </ListItem>
            ))}
        </List>
    );
};
