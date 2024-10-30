export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername: string;
    isCancelled: boolean;
    attendees: Attendee[];
}

export interface Attendee {
    username: string;
    displayName: string;
    bio: string | null;
    image: string | null;
}
