import { Attendee } from '../../../app/models/activity';
import { Image, List, ListItem, Popup } from 'semantic-ui-react';
import { CustomProfileCard } from '../../common/CustomProfileCard';
import { useStore } from '../../../app/stores/store';

interface Props {
    attendees: Attendee[];
}

export const ActivityAttendees = ({ attendees }: Props) => {
    const { profileStore, userStore } = useStore();
    const { profile } = profileStore;
    const { user } = userStore;
    return (
        <List horizontal>
            {attendees.map((attendee: Attendee) => (
                <ListItem key={attendee.userName}>
                    <Popup
                        content={
                            <CustomProfileCard
                                profileImage={attendee.image}
                                profileDisplayName={attendee.displayName}
                                followUserName={attendee.userName}
                                profileFollowCount={attendee.followersCount}
                                //profile={profile}
                                isFollowing={profile?.following ?? false}
                                user={user}
                            />
                        }
                        trigger={
                            <Image
                                src={attendee.image ?? '/assets/user.png'}
                                size="mini"
                                circular
                            />
                        }
                        mouseLeaveDelay={5000}
                    ></Popup>
                </ListItem>
            ))}
        </List>
    );
};
