import { Card, CardContent, CardHeader, Icon, Image } from 'semantic-ui-react';
import { CustomAnimatedButton } from '../../app/common/CustomeAnimatedButton/CustomAnimatedButton';
import { Profile, User } from '../../app/models/user';

interface ProfileCardProps {
    profileImage: string | null;
    profileDisplayName: string;
    profileFollowCount: number;
    followUserName: string;
    currentPageProfileUserName: string;
    profile: Profile | null;
    user: User | null;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const isHost = props.followUserName === props.user?.userName;
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
            <CardContent>
                {!isHost && (
                    <CustomAnimatedButton
                        currentPageProfileUserName={
                            props.currentPageProfileUserName
                        }
                        profile={props.profile}
                        user={props.user}
                        setFollowersCount={() => {}}
                        setFollowingsCount={() => {}}
                    />
                )}
            </CardContent>
        </Card>
    );
};
