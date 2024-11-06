import { useState } from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

interface ProfileFiltersProps {
    activeMenuItem: (activeMenuName: string) => void;
    activeItem: string;
}

export const ProfileFilters = (props: ProfileFiltersProps) => {
    return (
        <>
            <Menu
                vertical
                size="large"
                style={{ width: '100%', marginTop: '7%' }}
            >
                <Header icon="filter" attached color="teal" content="Filters" />
                <Menu.Item
                    content="About"
                    onClick={() => props.activeMenuItem('About')}
                    name="About"
                    active={props.activeItem === 'About'}
                />
                <Menu.Item
                    content="Photos"
                    onClick={() => props.activeMenuItem('Photos')}
                    name="Photos"
                    active={props.activeItem === 'Photos'}
                />
                <Menu.Item content="Events" />
                <Menu.Item content="Followers" />
                <Menu.Item content="Following" />
            </Menu>
            <Header />
        </>
    );
};
