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
        selectedActivity: activity,
        loadActivity,
        loadingInitial,
        loadActivities
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
    }, [id]);

    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Grid>
            {activity.isCancelled ? (
                <>Activity has been cancelled</>
            ) : (
                <Grid>
                    {' '}
                    <Grid.Column width={10}>
                        <ActivityDetailedHeader activity={activity} />
                        <ActivityDetailedInfo activity={activity} />
                        <ActivityDetailedChat />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ActivityDetailedSidebar
                            attendees={activity.attendees}
                            hostUsername={activity.hostUsername}
                        />
                    </Grid.Column>
                </Grid>
            )}
        </Grid>
    );
});
