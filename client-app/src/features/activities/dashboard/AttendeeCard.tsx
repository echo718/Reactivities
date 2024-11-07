import { Attendee } from '../../../app/models/activity';
import { Card, CardContent, CardHeader, Icon, Image } from 'semantic-ui-react';

interface AttendeeCardProps {
    attendee: Attendee;
}

export const AttendeeCard = ({ attendee }: AttendeeCardProps) => {
    return (
        <Card>
            <Image
                src={attendee.image ?? '/assets/user.png'}
                wrapped
                ui={false}
            />
            <CardContent>
                <CardHeader>{attendee.displayName}</CardHeader>
            </CardContent>
            <CardContent extra>
                <a>
                    <Icon name="user" />
                    22 Friends
                </a>
            </CardContent>
        </Card>
    );
};
