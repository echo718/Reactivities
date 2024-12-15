import { observer } from 'mobx-react-lite';
import { CardGroup, Message } from 'semantic-ui-react';
import { Profile, User } from '../../../../../app/models/user';
import { ProfileCard } from '../../../../common/ProfileCard';
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
                        <ProfileCard
                            key={index}
                            profileImage={follow.image}
                            profileDisplayName={follow.displayName}
                            followUserName={follow.userName}
                            profileFollowCount={follow.followersCount}
                            // currentPageProfileUserName={
                            //     props.currentPageProfileUserName
                            // }
                            profile={props.profile}
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
