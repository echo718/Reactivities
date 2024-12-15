import { Button, ButtonContent, Loader } from 'semantic-ui-react';
import './style.css';
import { useState } from 'react';
import { FollowingTypes } from '../../../features/profile/Functions/profileDics';
import { agent } from '../../api/agent';
import { Profile, User } from '../../models/user';

interface CustomAnimatedButtonProps {
    currentPageProfileUserName: string;
    profile: Profile | null;
    user: User | null;
    setFollowersCount: (followersProfileLength: number) => void;
    setFollowingsCount: (followingsProfileLength: number) => void;
}

export const CustomAnimatedButton = (props: CustomAnimatedButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [visibleText, setVisibleText] = useState(
        !props.profile?.following
            ? FollowingTypes.NotFollowing
            : FollowingTypes.Following
    );
    const [hiddenText, setHiddenText] = useState(
        !props.profile?.following
            ? FollowingTypes.Follow
            : FollowingTypes.NotFollow
    );

    const updateFollows = async (name: string) => {
        setIsLoading(true);
        await agent.Profile.updateFollow(name);
        const followingsProfile: Profile[] = (await agent.Profile.getFollowings(
            name,
            FollowingTypes.Followings
        )) as Profile[];

        const followersProfile: Profile[] = (await agent.Profile.getFollowings(
            name,
            FollowingTypes.Followers
        )) as Profile[];

        props.setFollowersCount(followersProfile.length);
        props.setFollowingsCount(followingsProfile.length);

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
        <div>
            {isLoading ? (
                <Loader active size="small" inline />
            ) : (
                <Button
                    animated
                    className="animated-button"
                    onClick={() => {
                        updateFollows(props.currentPageProfileUserName);
                    }}
                >
                    <ButtonContent visible>{visibleText}</ButtonContent>
                    <ButtonContent hidden>{hiddenText}</ButtonContent>
                </Button>
            )}
        </div>
    );
};
