import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Icon,
    Image
} from 'semantic-ui-react';

interface ProfileCardProps {
    profileImage: string | null;
    profileDisplayName: string;
    profileFollowCount: number;
}

export const ProfileCard = (props: ProfileCardProps) => {
    return (
        <Card
            onClick={() => {
                window.location.reload();
                location.assign(`/profile/${props.profileDisplayName}`);
            }}
        >
            <Image
                src={props.profileImage ?? '/assets/user.png'}
                wrapped
                ui={false}
            ></Image>
            <CardContent>
                <CardHeader>{props.profileDisplayName}</CardHeader>
            </CardContent>
            <CardContent extra>
                <>
                    <Icon name="user" />
                    {props.profileFollowCount} Followers
                </>
            </CardContent>
        </Card>
    );
};
