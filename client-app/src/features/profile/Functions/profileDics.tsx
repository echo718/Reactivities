export const ProfileDic: { [key in ProfileCategories]: string } = {
    About: 'About',
    Photos: 'Photos',
    Events: 'Events',
    Followers: 'Followers',
    Followings: 'Followings'
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
    | 'Followings';
