const ProfileDic = {
    About: 'About',
    Photos: 'Photos',
    Events: 'Events',
    Followers: 'Followers',
    Followings: 'Followings'
};

const ProfileFilterSet = [
    ProfileDic.About,
    ProfileDic.Photos,
    ProfileDic.Events,
    ProfileDic.Followers,
    ProfileDic.Followings
];

type ProfileFilters =
    | 'About'
    | 'Photos'
    | 'Events'
    | 'Followers'
    | 'Followings';
