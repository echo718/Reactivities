import {
    HttpTransportType,
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel
} from '@microsoft/signalr';
import { ChatComment } from '../models/comment';
import { makeAutoObservable, runInAction } from 'mobx';
import { store } from './store';
import { sleep } from '../api/agent';

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = async (activityId: string) => {
        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(
                    import.meta.env.VITE_CHAT_URL + '?activityId=' + activityId,
                    {
                        accessTokenFactory: () => store.userStore.user?.token!,
                        skipNegotiation: true,
                        transport: HttpTransportType.WebSockets
                    }
                )
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            await this.stopHubConnection().then(async () => await sleep(1000));

            if (this.hubConnection.state === HubConnectionState.Disconnected) {
                await this.hubConnection
                    .start()
                    .catch((error) =>
                        console.log('Error establishing the connection:', error)
                    );
                this.hubConnection.on(
                    'LoadComments',
                    (comments: ChatComment[]) => {
                        runInAction(() => {
                            comments.forEach((comment) => {
                                //todo: why add z
                                comment.createdAt = new Date(
                                    comment.createdAt + 'Z'
                                );
                            });
                            this.comments = comments;
                        });
                    }
                );

                this.hubConnection.on(
                    'ReceiveComments',
                    (comment: ChatComment) => {
                        runInAction(() => {
                            this.comments.forEach((comment) => {
                                comment.createdAt = new Date(comment.createdAt);
                            });
                            const isExist = this.comments.find(
                                (a) => a.id === comment.id
                            )?.id;
                            if (!isExist) this.comments.unshift(comment);
                        });
                    }
                );
            }
        }
    };

    stopHubConnection = async () => {
        await this.hubConnection
            ?.stop()
            .catch((error) => console.log('Error stopping connection', error));
    };

    clearComments = async () => {
        this.comments = [];
        await this.stopHubConnection();
    };

    addComment = async (values: { body: string; activityId?: string }) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch (err) {
            console.log(err);
        }
    };
}
