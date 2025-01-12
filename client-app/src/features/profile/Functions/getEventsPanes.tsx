import { ReactNode } from 'react';
import {
    SemanticShorthandItem,
    TabPane,
    TabPaneProps
} from 'semantic-ui-react';
import { EventsCategories, EventsSet } from './profileDics';
import EventItemPlaceholder from '../Sections/ProfileFilters/Events/EventItemPlaceholder';
import { CustomEventCard } from '../../common/CustomEventCard';
import { format } from 'date-fns/format';
import { useStore } from '../../../app/stores/store';
import { ProfileEvent } from '../../../app/models/activity';

export const getEventsPanes = (currentEvents: ProfileEvent[] | null) => {
    const {
        profileStore: { loadingEvents }
    } = useStore();

    const tab: {
        pane?: SemanticShorthandItem<TabPaneProps>;
        menuItem?: any;
        render?: (() => ReactNode) | undefined;
    }[] = [];

    EventsSet.map(
        (
            event: { tabName: string; tabType: EventsCategories },
            index: number
        ) => {
            tab.push({
                menuItem: event.tabName,
                render: () => (
                    <TabPane attached={false} index={index}>
                        {loadingEvents ? (
                            <EventItemPlaceholder />
                        ) : (
                            currentEvents?.map((currentEvent) => (
                                <CustomEventCard
                                    id={currentEvent.id}
                                    category={currentEvent.category}
                                    title={currentEvent.title}
                                    date={
                                        currentEvent.date
                                            ? format(
                                                  currentEvent.date,
                                                  'dd LLL'
                                              )
                                            : ''
                                    }
                                    time={
                                        currentEvent.date
                                            ? format(currentEvent.date, 'HH:mm')
                                            : ''
                                    }
                                />
                            ))
                        )}
                    </TabPane>
                )
            });
        }
    );

    return tab;
};
