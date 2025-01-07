import { Grid, Loader } from 'semantic-ui-react';
import { ActivityList } from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { ActivityFilters } from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';

export const ActivityDashboard = observer(() => {
    const { activityStore } = useStore();
    const {
        loadActivities,
        loadingInitial,
        activityRegistry,
        setPagingParams,
        pagination
    } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    };

    useEffect(() => {
        if (activityRegistry.size === 0) loadActivities();
    }, [activityStore, activityRegistry]);

    if (loadingInitial && !loadingNext)
        return <LoadingComponent content="Loading activities" />;

    return (
        <Grid>
            <Grid.Column width="10">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={
                        !loadingNext &&
                        !!pagination &&
                        pagination.currentPage < pagination.totalPages
                    }
                    initialLoad={false}
                >
                    <ActivityList />
                </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters />
            </Grid.Column>
            <Grid.Column width="10">
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    );
});
