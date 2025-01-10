import { observer } from 'mobx-react-lite';
import {
    Grid,
    GridColumn,
    Header,
    Icon,
    SemanticShorthandItem,
    Tab,
    TabPane,
    TabPaneProps
} from 'semantic-ui-react';
import { EventsDic, EventsSet } from '../../../Functions/profileDics';
import { ReactNode, useState } from 'react';
import { CustomEventCard } from '../../../../common/CustomEventCard';
import { useStore } from '../../../../../app/stores/store';
import { ProfileEvent } from '../../../../../app/models/activity';
import { format } from 'date-fns/format';
import EventItemPlaceholder from './EventItemPlaceholder';

export const Events = observer(
    (props: {
        currentPageProfileUserName: string;
        events: ProfileEvent[] | null;
    }) => {
        const {
            profileStore: { getEvents, events, loadingEvents }
        } = useStore();

        const [currentEvent, setCurrentEvent] = useState(props.events);

        const handleChange = (e: any, data: any) => {
            const activeIndex = data['activeIndex'];
            const tabLabelName = data.panes[activeIndex].menuItem as string;
            console.log('data', activeIndex, tabLabelName);
            switch (tabLabelName) {
                case EventsDic.future.tabName:
                    getEvents(
                        props.currentPageProfileUserName,
                        EventsDic.future.tabType
                    );
                    setCurrentEvent(events);
                    break;
                case EventsDic.past.tabName:
                    getEvents(
                        props.currentPageProfileUserName,
                        EventsDic.past.tabType
                    );
                    setCurrentEvent(events);
                    break;
                case EventsDic.hosting.tabName:
                    getEvents(
                        props.currentPageProfileUserName,
                        EventsDic.hosting.tabType
                    );
                    setCurrentEvent(events);
                    break;
                default:
            }
        };

        const getPanes = () => {
            const tab: {
                pane?: SemanticShorthandItem<TabPaneProps>;
                menuItem?: any;
                render?: (() => ReactNode) | undefined;
            }[] = [];

            EventsSet.map((event) => {
                tab.push({
                    menuItem: event.tabName,
                    render: () => (
                        <TabPane attached={false}>
                            {loadingEvents ? (
                                <EventItemPlaceholder />
                            ) : (
                                currentEvent?.map((currentEvent) => (
                                    <CustomEventCard
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
                                                ? format(
                                                      currentEvent.date,
                                                      'HH mm'
                                                  )
                                                : ''
                                        }
                                    />
                                ))
                            )}
                        </TabPane>
                    )
                });
            });

            return tab;
        };

        return (
            <>
                <Grid
                    style={{
                        width: '100%',
                        paddingBottom: '5%'
                    }}
                >
                    <GridColumn floated="left" width={10}>
                        <Header as="h2">
                            <Icon name="home" size="small" />
                            Activities
                        </Header>
                    </GridColumn>
                </Grid>
                <Tab
                    menu={{ secondary: true, pointing: true }}
                    panes={getPanes()}
                    onTabChange={handleChange}
                />
            </>
        );
    }
);
