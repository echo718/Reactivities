export interface User {
    userName: string;
    displayName: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: number;
    displayName?: string;
}

export interface Profile extends User {
    photos: Photo[] | null;
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}
