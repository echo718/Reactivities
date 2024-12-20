import { Following } from './user';

export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUserName: string;
    hostUserImage?: string;
    isCancelled: boolean;
    attendees: Attendee[];
}

export interface Attendee extends Following {
    userName: string;
    displayName: string;
    bio: string | null;
    image: string | null;
}
