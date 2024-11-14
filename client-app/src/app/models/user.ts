export interface User extends BasicDetail {
    userName: string;
    token: string;
    image?: string;
}

export interface BasicDetail {
    displayName: string;
    bio?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    userName?: number;
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
