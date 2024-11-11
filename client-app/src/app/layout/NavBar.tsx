import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export const Navbar = observer(() => {
    const {
        userStore: { user, logout }
    } = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header as={NavLink} to="/">
                    <img
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ marginRight: '10px' }}
                    />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="activities" as={NavLink} to="/activities" />
                <Menu.Item name="Errors" as={NavLink} to="/errors" />
                <Menu.Item>
                    <Button
                        positive
                        content="Create Activity"
                        as={NavLink}
                        to="/createActivity"
                    />
                </Menu.Item>
                <Menu.Item position="right">
                    <Image
                        src={user?.image || 'assets/user.png'}
                        avatar
                        spaced="right"
                    />
                    <Dropdown pointing="top right" text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                as={Link}
                                to={`/profile/${user?.userName}`}
                                text="My profile"
                                icon="user"
                                onClick={() =>
                                    location.assign(
                                        `/profile/${user?.userName}`
                                    )
                                }
                            />
                            <Dropdown.Item
                                onClick={logout}
                                text="Logout"
                                icon="power"
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    );
});
