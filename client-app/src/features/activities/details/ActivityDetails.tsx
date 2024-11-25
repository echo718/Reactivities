import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export const ActivityDetails = observer(() => {
    const { activityStore } = useStore();
    const {
        selectedActivity,
        loadActivity,
        loadingInitial,
        loadActivities,
        clearSelectedActivity
    } = activityStore;

    const { id } = useParams();

    useEffect(() => {
        const fetchActivities = async () => {
            await loadActivities();
        };

        fetchActivities()
            .then(() => {
                if (id) loadActivity(id);
            })
            .catch(console.error);

        clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity]);

    if (loadingInitial || !selectedActivity) return <LoadingComponent />;

    return (
        <Grid>
            <Grid>
                {' '}
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={selectedActivity} />
                    <ActivityDetailedInfo activity={selectedActivity} />
                    <ActivityDetailedChat activityId={selectedActivity.id} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSidebar
                        attendees={selectedActivity.attendees}
                        hostUserName={selectedActivity.hostUserName}
                    />
                </Grid.Column>
            </Grid>
        </Grid>
    );
});
