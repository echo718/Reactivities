import { Attendee } from "../../../app/models/activity";
import {
  Image,
  List,
  ListItem,
  Popup,
} from "semantic-ui-react";

interface Props {
  attendees: Attendee[];
}

export const ActivityAttendees = ({
  attendees,
}: Props) => {
  return (
    <List horizontal>
      {attendees.map(
        (attendee: Attendee) => (
          <ListItem
            key={attendee.username}
          >
            <Popup
              content={
                attendee.displayName
              }
              trigger={
                <Image
                  src="/assets/user.png"
                  size="mini"
                  circular
                />
              }
            ></Popup>
          </ListItem>
        )
      )}
    </List>
  );
};
