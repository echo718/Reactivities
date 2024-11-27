import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { LoadingComponent } from '../../../../app/layout/LoadingComponent';
import { useStore } from '../../../../app/stores/store';

interface FollowingsProps {
    currentPageProfileUserName: string;
    followingType: string;
}

export const Followings = observer((props: FollowingsProps) => {
    const { profileStore } = useStore();
    const { followings, getFollowings, loadingProfile } = profileStore;

    useEffect(() => {
        //getFollowings(props.currentPageProfileUserName, props.followingType);
        console.log('test');
    }, []);

    if (loadingProfile) return <LoadingComponent content="Loading profile" />;

    return <></>;
});
