export interface User {
    username: number;
    displayName: string;
    token: string;
    image?:string;
}

export interface UserFormValues {
    email: string;
    password:string;
    username?: number;
    displayName?: string; 
}