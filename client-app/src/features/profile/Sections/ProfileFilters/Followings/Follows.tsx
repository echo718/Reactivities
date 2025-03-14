import { CardGroup, Message } from 'semantic-ui-react';
import { Profile, User } from '../../../../../app/models/user';
import { CustomProfileCard } from '../../../../common/CustomProfileCard';
import { FollowingTypes } from '../../../Functions/profileDics';

interface FollowsProps {
    currentPageProfileUserName: string;
    followingType: string;
    follows?: Profile[];
    profile: Profile | null;
    user: User | null;
}

export const Follows = (props: FollowsProps) => {
    const hasFollows = props.follows ? props.follows.length > 0 : false;

    return (
        <>
            {hasFollows ? (
                <CardGroup>
                    {props.follows?.map((follow: Profile, index) => (
                        <CustomProfileCard
                            key={index}
                            profileImage={follow.image}
                            profileDisplayName={follow.displayName}
                            followUserName={follow.userName}
                            profileFollowCount={follow.followersCount}
                            isFollowing={follow.following}
                            user={props.user}
                        />
                    ))}
                </CardGroup>
            ) : (
                <Message
                    success
                    style={{ margin: 'auto', marginTop: '3' }}
                    as="h1"
                >
                    {' '}
                    Waiting for more{' '}
                    {props.followingType === FollowingTypes.Followers
                        ? FollowingTypes.Followers
                        : FollowingTypes.Followings}
                </Message>
            )}
        </>
    );
};
