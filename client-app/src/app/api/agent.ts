import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity, ProfileEvent } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routers';
import { store } from '../stores/store';
import {
    BasicDetail,
    Photo,
    User,
    UserFormValues,
    Profile as ProfileType
} from '../models/user';
import { PaginatedResult } from '../models/pagination';

export const sleep = (delay: number) => {
    return new Promise((resolver) => {
        setTimeout(resolver, delay);
    });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token && config.headers)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    async (response) => {
        if (import.meta.env.DEV) await sleep(1000);
        const pagination = response.headers['pagination'];
        if (pagination) {
            response.data = new PaginatedResult(
                response.data,
                JSON.parse(pagination)
            );
            return response as AxiosResponse<PaginatedResult<any>>;
        }
        return response;
    },
    (error: AxiosError) => {
        const { data, status, config } = error.response as AxiosResponse;
        switch (status) {
            case 400:
                if (
                    config.method == 'get' &&
                    Object.prototype.hasOwnProperty.call(data.errors, 'id')
                ) {
                    router.navigate('/not-found');
                }
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error('unauthorised');
                break;
            case 403:
                toast.error('forbidden');
                break;
            case 404:
                router.navigate('/not-found');
                break;
            case 500:
                store.commonStore.setServerError(data);
                router.navigate('/server-error');
                break;
            default:
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) =>
        axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Activities = {
    list: (params: URLSearchParams) =>
        axios
            .get<PaginatedResult<Activity[]>>('/activities', { params })
            .then(responseBody),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => request.post<void>('/activities', activity),
    update: (activity: Activity) =>
        request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.delete<void>(`/activities/${id}`),
    attend: (id: string) => request.post<void>(`/activities/${id}/attend`, ''),
    cancel: (id: string) => request.post<void>(`/activities/${id}/attend`, '')
};

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post('/account/login', user),
    register: (user: UserFormValues) => request.post('/account/register', user)
};

const Profile = {
    get: (userName: string) => request.get<User>(`/profiles/${userName}`),
    delete: (photoId: string) => request.delete<void>(`/photos/${photoId}`),
    setMain: (photoId: string) =>
        request.post<void>(`/photos/${photoId}/setmain`, {}),
    add: (file: any) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('/photos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    put: (profile: BasicDetail) => request.put<void>('/profiles', profile),
    getFollowings: (
        currentPageProfileUserName: string,
        followingType: string
    ) =>
        request.get<ProfileType[]>(
            `/follow/${currentPageProfileUserName}?predicate=${followingType}`
        ),
    updateFollow: (name: string) => request.post<void>(`/follow/${name}`, {}),
    getEvents: (userName: string, predicate: string) =>
        request.get<ProfileEvent[]>(
            `/profiles/${userName}/activities?predicate=${predicate}`
        )
};

export const agent = {
    Activities,
    Account,
    Profile
};
