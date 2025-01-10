export const ProfileDic: { [key in ProfileCategories]: string } = {
    About: 'About',
    Photos: 'Photos',
    Events: 'Events',
    Followers: 'Followers',
    Followings: 'Followings',
    Follower: 'Follower',
    Following: 'Following'
};

export const ProfileFilterSet = [
    ProfileDic.About,
    ProfileDic.Photos,
    ProfileDic.Events,
    ProfileDic.Followers,
    ProfileDic.Followings
];

export type ProfileCategories =
    | 'About'
    | 'Photos'
    | 'Events'
    | 'Followers'
    | 'Followings'
    | 'Follower'
    | 'Following';

export const FollowingTypes = {
    Followings: 'followings',
    Followers: 'followers',
    Following: 'Following',
    NotFollowing: 'Not Following',
    Follow: 'Follow',
    NotFollow: 'Not Follow'
};

export const EventsDic: {
    [key in EventsCategories]: { tabName: string; tabType: EventsCategories };
} = {
    future: { tabName: 'Future Activities', tabType: 'future' },
    past: { tabName: 'Past Activities', tabType: 'past' },
    hosting: { tabName: 'Hosting', tabType: 'hosting' }
};

export const EventsSet = [EventsDic.future, EventsDic.past, EventsDic.hosting];

export type EventsCategories = 'future' | 'past' | 'hosting';
