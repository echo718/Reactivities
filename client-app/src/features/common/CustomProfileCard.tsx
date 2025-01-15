import { Card, CardContent, CardHeader, Icon, Image } from 'semantic-ui-react';
import { CustomAnimatedButton } from '../../app/common/CustomeAnimatedButton/CustomAnimatedButton';
import { User } from '../../app/models/user';
import { useState } from 'react';
import { ProfileDic } from '../profile/Functions/profileDics';
import { Link } from 'react-router-dom';

interface CustomProfileCardProps {
    profileImage: string | null;
    profileDisplayName: string;
    profileFollowCount: number;
    followUserName: string;
    user: User | null;
    isFollowing: boolean;
}

export const CustomProfileCard = (props: CustomProfileCardProps) => {
    const isHost = props.followUserName === props.user?.userName;
    const [followersCount, setFollowersCount] = useState(
        props.profileFollowCount
    );

    const getFollowerUnitName = (count: number) => {
        return count === 1 || count === 0
            ? ProfileDic.Follower
            : ProfileDic.Followers;
    };

    return (
        <Card style={{ cursor: 'pointer' }}>
            <Image
                src={props.profileImage ?? '/assets/user.png'}
                wrapped
                ui={false}
                as={Link}
                to={`/profile/${props.profileDisplayName.toLocaleLowerCase()}`}
                // onClick={() => {
                //     // navigate(`/profile/${props.profileDisplayName}`);
                //     window.location.reload();
                //     location.assign(`/profile/${props.profileDisplayName}`);
                // }}
            ></Image>
            <CardContent>
                <CardHeader
                    as={Link}
                    to={`/profile/${props.profileDisplayName.toLocaleLowerCase()}`}
                    // onClick={() => {
                    //     window.location.reload();
                    //     location.assign(`/profile/${props.profileDisplayName}`);
                    // }}
                >
                    {props.profileDisplayName}
                </CardHeader>
            </CardContent>
            <CardContent
                extra
                as={Link}
                to={`/profile/${props.profileDisplayName.toLocaleLowerCase()}`}
                // onClick={() => {
                //     window.location.reload();
                //     location.assign(`/profile/${props.profileDisplayName}`);
                // }}
            >
                <>
                    <Icon name="user" />
                    {followersCount} {getFollowerUnitName(followersCount)}
                </>
            </CardContent>
            <CardContent>
                {!isHost && (
                    <CustomAnimatedButton
                        currentPageProfileUserName={props.followUserName}
                        isFollowing={props.isFollowing}
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
