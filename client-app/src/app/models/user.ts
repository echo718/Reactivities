export interface User extends BasicDetail {
    userName: string;
    token: string;
    image: string | null;
}

export interface BasicDetail {
    displayName: string;
    bio?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    userName?: string;
    displayName?: string;
}

export interface Profile extends User, Following {
    photos: Photo[] | null;
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}

export interface Following {
    following: boolean;
    followersCount: number;
    followingCount: number;
}
