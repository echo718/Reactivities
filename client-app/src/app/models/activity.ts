import { Following } from './user';

export interface Activity extends ProfileEvent {
    description: string;
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

export interface ProfileEvent {
    id: string;
    title: string;
    date: Date | null;
    category: string;
}
