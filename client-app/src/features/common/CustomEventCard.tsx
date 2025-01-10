import { Card, CardContent, CardHeader, Icon, Image } from 'semantic-ui-react';

interface CustomEventCardProps {
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
                fluid
                //style={activityImageStyle}
                onClick={() => {
                    window.location.reload();
                    //  location.assign(`/profile/${props.profileDisplayName}`);
                }}
            />
            <CardContent>
                <CardHeader
                    onClick={() => {
                        window.location.reload();
                        //  location.assign(`/profile/${props.profileDisplayName}`);
                    }}
                >
                    {props.title}
                </CardHeader>
            </CardContent>
            <CardContent
                extra
                onClick={() => {
                    window.location.reload();
                    //  location.assign(`/profile/${props.profileDisplayName}`);
                }}
            >
                {' '}
                {props.date}
            </CardContent>
            <CardContent
                extra
                onClick={() => {
                    window.location.reload();
                    // location.assign(`/profile/${props.profileDisplayName}`);
                }}
            >
                {' '}
                {props.time}
            </CardContent>
        </Card>
    );
};
