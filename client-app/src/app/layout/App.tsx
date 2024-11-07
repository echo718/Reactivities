import { Fragment, useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Navbar } from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { LoadingComponent } from './LoadingComponent';
import { ModalContainer } from '../common/modals/ModalContainer';

function App() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getCurrentUser().finally(() => {
                commonStore.setAppLoaded();
            });
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded)
        return <LoadingComponent content="loading app..." />;

    return (
        <Fragment>
            <ModalContainer />
            <ToastContainer
                position="bottom-right"
                hideProgressBar
                theme="colored"
            />
            {location.pathname === '/' ? (
                <HomePage />
            ) : (
                <>
                    <Navbar />
                    <Container style={{ marginTop: '7em' }}>
                        <Outlet />
                    </Container>
                </>
            )}
        </Fragment>
    );
}

export default observer(App);
