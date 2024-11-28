import { observer } from 'mobx-react-lite';
import { Profile } from '../../../../app/models/user';
import { ProfileCard } from '../../../common/ProfileCard';
import { CardGroup, Label, Message } from 'semantic-ui-react';
import { FollowingTypes } from '../../Functions/profileDics';

interface FollowsProps {
    currentPageProfileUserName: string;
    followingType: string;
    follows?: Profile[];
}

export const Follows = observer((props: FollowsProps) => {
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
                            profileFollowCount={follow.followersCount}
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
});
