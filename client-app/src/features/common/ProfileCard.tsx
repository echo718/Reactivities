import { Card, CardContent, CardHeader, Icon, Image } from 'semantic-ui-react';
import { CustomAnimatedButton } from '../../app/common/CustomeAnimatedButton/CustomAnimatedButton';
import { Profile, User } from '../../app/models/user';
import { useState } from 'react';

interface ProfileCardProps {
    profileImage: string | null;
    profileDisplayName: string;
    profileFollowCount: number;
    followUserName: string;
    //currentPageProfileUserName: string;
    profile: Profile | null;
    user: User | null;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const isHost = props.followUserName === props.user?.userName;
    const [followersCount, setFollowersCount] = useState(
        props.profileFollowCount
    );
    return (
        <Card style={{ cursor: 'pointer' }}>
            <Image
                src={props.profileImage ?? '/assets/user.png'}
                wrapped
                ui={false}
                onClick={() => {
                    window.location.reload();
                    location.assign(`/profile/${props.profileDisplayName}`);
                }}
            ></Image>
            <CardContent>
                <CardHeader
                    onClick={() => {
                        window.location.reload();
                        location.assign(`/profile/${props.profileDisplayName}`);
                    }}
                >
                    {props.profileDisplayName}
                </CardHeader>
            </CardContent>
            <CardContent
                extra
                onClick={() => {
                    window.location.reload();
                    location.assign(`/profile/${props.profileDisplayName}`);
                }}
            >
                <>
                    <Icon name="user" />
                    {followersCount} Followers
                </>
            </CardContent>
            <CardContent>
                {!isHost && (
                    <CustomAnimatedButton
                        currentPageProfileUserName={props.followUserName}
                        profile={props.profile}
                        user={props.user}
                        setFollowersCount={(followersProfileLength: number) => {
                            setFollowersCount(followersProfileLength);
                        }}
                        setFollowingsCount={() => {}}
                    />
                )}
            </CardContent>
        </Card>
    );
};
