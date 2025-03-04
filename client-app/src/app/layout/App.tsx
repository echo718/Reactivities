import { Fragment, useEffect } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Navbar } from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { LoadingComponent } from './LoadingComponent';
import { ModalContainer } from '../common/modals/ModalContainer';

function App() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        console.log('commonStore.token', commonStore.token);
        if (commonStore.token) {
            userStore.getCurrentUser().finally(() => {
                !commonStore.appLoaded && commonStore.setAppLoaded(true);
            });
        } else {
            commonStore.setAppLoaded(false);
        }
    }, [commonStore, userStore]);

    console.log('commonStore.appLoaded', commonStore.appLoaded);

    if (!commonStore.appLoaded)
        return <LoadingComponent content="loading app..." />;

    return (
        <Fragment>
            <ScrollRestoration />
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
