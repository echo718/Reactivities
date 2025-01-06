import { observer } from 'mobx-react-lite';
import { Divider, Segment, Statistic } from 'semantic-ui-react';
import { useState } from 'react';
import { Profile, User } from '../../../../app/models/user';
import { ProfileDic } from '../../Functions/profileDics';
import { CustomAnimatedButton } from '../../../../app/common/CustomeAnimatedButton/CustomAnimatedButton';

interface FollowsAtIntroductionProps {
    profile: Profile | null;
    currentPageProfileUserName: string;
    user: User | null;
    isHost: boolean;
}

export const FollowsAtIntroduction = observer(
    (props: FollowsAtIntroductionProps) => {
        const [followersCount, setFollowersCount] = useState(
            props.profile?.followersCount
        );
        const [followingsCount, setFollowingsCount] = useState(
            props.profile?.followingCount
        );

        return (
            <Segment basic textAlign="center">
                <Statistic
                    size="small"
                    label={
                        followersCount === 1 || followersCount === 0
                            ? ProfileDic.Follower
                            : ProfileDic.Followers
                    }
                    value={followersCount}
                />
                <Statistic
                    size="small"
                    label={
                        followingsCount === 0 || followingsCount === 1
                            ? ProfileDic.Following
                            : ProfileDic.Followings
                    }
                    value={followingsCount}
                />

                {props.profile?.userName != props.user?.userName && (
                    <>
                        <Divider section />

                        <CustomAnimatedButton
                            currentPageProfileUserName={
                                props.currentPageProfileUserName
                            }
                            isFollowing={props.profile?.following ?? false}
                            user={props.user}
                            setFollowersCount={(
                                followersProfileLength: number
                            ) => setFollowersCount(followersProfileLength)}
                            setFollowingsCount={(
                                followingsProfileLength: number
                            ) => setFollowingsCount(followingsProfileLength)}
                        />
                    </>
                )}
            </Segment>
        );
    }
);
