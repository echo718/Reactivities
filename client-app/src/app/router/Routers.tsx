import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { ActivityForm } from '../../features/activities/form/ActivityForm';
import { ActivityDetails } from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { NotFound } from '../../features/errors/NotFound';
import { ServerError } from '../../features/errors/ServerError';
import { LoginForm } from '../../features/users/LoginForm';
import { Profile } from '../../features/profile/Profile';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'activities',
                element: <ActivityDashboard />
            },
            {
                path: 'activities/:id',
                element: <ActivityDetails />
            },
            {
                path: 'createActivity',
                element: <ActivityForm key="create" />
            },
            {
                path: 'manage/:id',
                element: <ActivityForm key="manage" />
            },
            {
                path: 'errors',
                element: <TestErrors key="errors" />
            },
            {
                path: 'not-found',
                element: <NotFound />
            },
            {
                path: 'server-error',
                element: <ServerError />
            },
            {
                path: 'login',
                element: <LoginForm />
            },
            {
                path: 'profile/:userName',
                element: <Profile />
            },
            {
                path: '*',
                element: <Navigate replace to="/not-found" />
            }
        ]
    }
];

export const router = createBrowserRouter(routes);
