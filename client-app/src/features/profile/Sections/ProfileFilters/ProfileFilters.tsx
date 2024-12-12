import { Header, Menu } from 'semantic-ui-react';
import {
    ProfileCategories,
    ProfileDic,
    ProfileFilterSet
} from '../../Functions/profileDics';

interface ProfileFiltersProps {
    activeMenuItem: (activeMenuName: ProfileCategories) => void;
    activeItem: ProfileCategories;
    hostUserName?: string;
}

export const ProfileFilters = (props: ProfileFiltersProps) => {
    const urlDirectors = location.pathname.split('/');
    const urlName = urlDirectors[urlDirectors.length - 1].toLocaleLowerCase();
    const isHostProfile = urlName === props.hostUserName;

    const getProfileFilterSet = () => {
        if (isHostProfile) return ProfileFilterSet;

        return ProfileFilterSet.filter(
            (profileFilter) => profileFilter !== ProfileDic.Photos
        );
    };

    return (
        <Menu vertical size="large" style={{ width: '100%', marginTop: '7%' }}>
            <Header icon="filter" attached color="teal" content="Filters" />
            {getProfileFilterSet().map((profileFilter, index) => (
                <Menu.Item
                    key={index}
                    content={profileFilter}
                    onClick={() =>
                        props.activeMenuItem(profileFilter as ProfileCategories)
                    }
                    name={profileFilter}
                    active={props.activeItem === profileFilter}
                />
            ))}
        </Menu>
    );
};
