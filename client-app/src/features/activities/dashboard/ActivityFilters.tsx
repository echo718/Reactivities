import { observer } from 'mobx-react-lite';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export const ActivityFilters = observer(() => {
    const {
        activityStore: { predicate, setPredicate }
    } = useStore();

    return (
        <>
            <Menu
                vertical
                size="large"
                style={{ width: '100%', marginTop: '7%' }}
            >
                <Header icon="filter" attached color="teal" content="Filters" />
                <Menu.Item
                    content="All Activities"
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', true)}
                />
                <Menu.Item
                    content="I'm going"
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', true)}
                />
                <Menu.Item
                    content="I'm hosting"
                    active={predicate.has('isHosting')}
                    onClick={() => setPredicate('isHosting', true)}
                />
            </Menu>
            <Header />
            <Calendar
                onChange={(date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>
    );
});
