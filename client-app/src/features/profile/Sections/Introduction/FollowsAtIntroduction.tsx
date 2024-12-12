import { observer } from 'mobx-react-lite';
import { Divider, Segment, Statistic } from 'semantic-ui-react';
import { useState } from 'react';
import { Profile, User } from '../../../../app/models/user';
import { agent } from '../../../../app/api/agent';
import { FollowingTypes, ProfileDic } from '../../Functions/profileDics';
import { CustomAnimatedButton } from '../../../../app/common/CustomeAnimatedButton/CustomAnimatedButton';

interface FollowsAtIntroductionProps {
    profile: Profile | null;
    currentPageProfileUserName: string;
    user: User | null;
    isHost: boolean;
}

export const FollowsAtIntroduction = observer(
    (props: FollowsAtIntroductionProps) => {
        const [showFollow, setShowFollow] = useState(!props.isHost);
        const [isLoading, setIsLoading] = useState(false);
        const [visibleText, setVisibleText] = useState(
            showFollow && !props.profile?.following
                ? FollowingTypes.NotFollowing
                : FollowingTypes.Following
        );
        const [hiddenText, setHiddenText] = useState(
            showFollow && !props.profile?.following
                ? FollowingTypes.Follow
                : FollowingTypes.NotFollow
        );

        const [followersCount, setFollowersCount] = useState(
            props.profile?.followersCount
        );
        const [followingsCount, setFollowingsCount] = useState(
            props.profile?.followingCount
        );

        const updateFollows = async (name: string) => {
            setIsLoading(true);
            await agent.Profile.updateFollow(name);
            const followingsProfile: Profile[] =
                (await agent.Profile.getFollowings(
                    name,
                    FollowingTypes.Followings
                )) as Profile[];

            const followersProfile: Profile[] =
                (await agent.Profile.getFollowings(
                    name,
                    FollowingTypes.Followers
                )) as Profile[];

            setFollowersCount(followersProfile.length);
            setFollowingsCount(followingsProfile.length);

            const isFollowCurrentPageUser =
                followersProfile.filter(
                    (following) => following.userName === props.user?.userName
                ).length > 0;
            setVisibleText(
                isFollowCurrentPageUser
                    ? FollowingTypes.Following
                    : FollowingTypes.NotFollowing
            );
            setHiddenText(
                isFollowCurrentPageUser
                    ? FollowingTypes.NotFollow
                    : FollowingTypes.Follow
            );

            setIsLoading(false);
        };

        return (
            <Segment basic textAlign="center">
                <Statistic
                    size="small"
                    label={ProfileDic.Followers}
                    value={followersCount}
                />
                <Statistic
                    size="small"
                    label={ProfileDic.Followings}
                    value={followingsCount}
                />

                {props.profile?.userName != props.user?.userName && (
                    <>
                        <Divider section />

                        <CustomAnimatedButton
                            visibleText={visibleText}
                            hiddenText={hiddenText}
                            onClick={() => {
                                setShowFollow(!showFollow);
                                updateFollows(props.currentPageProfileUserName);
                            }}
                            isLoading={isLoading}
                        />
                    </>
                )}
            </Segment>
        );
    }
);
