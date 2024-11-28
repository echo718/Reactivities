import { makeAutoObservable, runInAction } from 'mobx';
import { agent } from '../api/agent';
import { User, UserFormValues } from '../models/user';
import { store } from './store';
import { router } from '../router/Routers';

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        const user: User = (await agent.Account.login(creds)) as User;
        store.commonStore.setToken(user.token);
        store.modalStore.closeModel();
        runInAction(() => (this.user = user));
        router.navigate('/activities');
    };

    register = async (creds: UserFormValues) => {
        const user: User = (await agent.Account.register(creds)) as User;
        store.commonStore.setToken(user.token);
        store.modalStore.closeModel();
        runInAction(() => (this.user = user));
        router.navigate('/activities');
    };

    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem('jwt');
        this.user = null;
        router.navigate('/');
    };

    getCurrentUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => (this.user = user));
        } catch (err) {
            console.log(err);
        }
    };

    setImage = async (imageUrl: string | null) => {
        try {
            runInAction(() => {
                if (this.user) {
                    this.user.image = imageUrl;
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
}
