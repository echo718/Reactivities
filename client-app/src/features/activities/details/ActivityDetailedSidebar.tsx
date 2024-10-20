import {
  Segment,
  List,
  Label,
  Item,
  Image,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Attendee } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
  attendees: Attendee[];
  hostUsername: string;
}

export default observer(
  function ActivityDetailedSidebar({
    attendees,
    hostUsername,
  }: Props) {
    const { userStore } = useStore();
    const attendeesCount =
      attendees.length;

    return (
      <>
        <Segment
          textAlign="center"
          style={{ border: "none" }}
          attached="top"
          secondary
          inverted
          color="teal"
        >
          {attendeesCount ?? "No"}{" "}
          People Going
        </Segment>
        <Segment attached>
          {attendees.map((attendee) => {
            const isActivityHost =
              attendee.displayName.toLowerCase() ===
              hostUsername.toLowerCase();
            const isHostName =
              userStore.user
                ?.displayName ===
              attendee.displayName;

            return (
              <List
                relaxed
                divided
                key={attendee.username}
              >
                <Item
                  style={{
                    position:
                      "relative",
                  }}
                >
                  {isActivityHost ? (
                    <Label
                      style={{
                        position:
                          "absolute",
                      }}
                      color="orange"
                      ribbon="right"
                    >
                      Host
                    </Label>
                  ) : null}

                  <Image
                    size="tiny"
                    src={
                      "/assets/user.png"
                    }
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="h3">
                      <Link to={`#`}>
                        {
                          attendee.displayName
                        }
                      </Link>
                    </Item.Header>
                    <Item.Extra
                      style={{
                        color: "orange",
                      }}
                    >
                      {isHostName
                        ? null
                        : "Following"}
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </List>
            );
          })}
        </Segment>
      </>
    );
  }
);
