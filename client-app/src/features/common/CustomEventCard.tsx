import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, Image } from 'semantic-ui-react';

interface CustomEventCardProps {
    id: string;
    category: string;
    title: string;
    date: string;
    time: string;
}

export const CustomEventCard = (props: CustomEventCardProps) => {
    return (
        <Card style={{ cursor: 'pointer' }}>
            <Image
                src={`/assets/categoryImages/${props.category?.toLowerCase()}.jpg`}
                as={Link}
                to={`/activities/${props.id}`}
                // onClick={() => {
                //     window.location.reload();
                //     location.assign(`/activities/${props.id}`);
                // }}
            />
            <CardContent>
                <CardHeader
                    as={Link}
                    to={`/activities/${props.id}`}
                    // onClick={() => {
                    //     window.location.reload();
                    //     location.assign(`/activities/${props.id}`);
                    // }}
                >
                    {props.title}
                </CardHeader>
            </CardContent>
            <CardContent
                extra
                as={Link}
                to={`/activities/${props.id}`}
                // onClick={() => {
                //     window.location.reload();
                //     location.assign(`/activities/${props.id}`);
                // }}
            >
                Activity Date: {props.date}
            </CardContent>
            <CardContent
                extra
                as={Link}
                to={`/activities/${props.id}`}
                // onClick={() => {
                //     window.location.reload();
                //     location.assign(`/activities/${props.id}`);
                // }}
            >
                Activity Time: {props.time}
            </CardContent>
        </Card>
    );
};
