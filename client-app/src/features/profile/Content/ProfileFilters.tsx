import { Header, Menu } from 'semantic-ui-react';

interface ProfileFiltersProps {
    activeMenuItem: (activeMenuName: ProfileFilters) => void;
    activeItem: ProfileFilters;
}

export const ProfileFilters = (props: ProfileFiltersProps) => {
    return (
        <Menu vertical size="large" style={{ width: '100%', marginTop: '7%' }}>
            <Header icon="filter" attached color="teal" content="Filters" />
            {ProfileFilterSet.map((profileFilter) => (
                <Menu.Item
                    content={profileFilter}
                    onClick={() =>
                        props.activeMenuItem(profileFilter as ProfileFilters)
                    }
                    name={profileFilter}
                    active={props.activeItem === profileFilter}
                />
            ))}
        </Menu>
    );
};
