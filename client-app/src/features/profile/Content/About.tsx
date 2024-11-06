import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

export const About = observer(() => {
    const { activityStore } = useStore();
    const { loadingInitial } = activityStore;
    const { userStore } = useStore();

    if (loadingInitial) return <LoadingComponent />;

    return <> {userStore.user?.displayName}</>;
});
