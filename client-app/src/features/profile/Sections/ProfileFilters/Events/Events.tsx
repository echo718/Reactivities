import { observer } from 'mobx-react-lite';
import { Grid, GridColumn, Header, Image, Tab } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../../app/stores/store';
import { ProfileEvent } from '../../../../../app/models/activity';
import { getEventsPanes } from '../../../Functions/getEventsPanes';
import { getEventTabType } from '../../../Functions/getEventTabType';

export const Events = observer(
    (props: {
        currentPageProfileUserName: string;
        initialEvents: ProfileEvent[] | null;
    }) => {
        const {
            profileStore: { getEvents, renderedEvents, loadingEvents }
        } = useStore();

        const [currentEvents, setCurrentEvents] = useState(props.initialEvents);

        useEffect(() => {
            if (!loadingEvents) {
                setCurrentEvents(renderedEvents);
            }
        }, [renderedEvents, loadingEvents]);

        const handleChange = (e: any, data: any) => {
            const activeIndex = data['activeIndex'];
            const tabLabelName = data.panes[activeIndex].menuItem as string;
            const eventTabType = getEventTabType(tabLabelName);

            getEvents(props.currentPageProfileUserName, eventTabType);
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
                            <Image
                                src={'/assets/activities.png'}
                                size="mini"
                                verticalAlign="middle"
                            />
                            Activities
                        </Header>
                    </GridColumn>
                </Grid>
                <Tab
                    menu={{ secondary: true, pointing: true }}
                    panes={getEventsPanes(currentEvents)}
                    onTabChange={handleChange}
                />
            </>
        );
    }
);
