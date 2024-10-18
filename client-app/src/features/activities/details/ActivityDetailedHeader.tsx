import { observer } from "mobx-react-lite";
import {
  Button,
  Header,
  Item,
  Segment,
  Image,
} from "semantic-ui-react";
import {
  Activity,
  Attendee,
} from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../../app/stores/store";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

export default observer(
  function ActivityDetailedHeader({
    activity,
  }: Props) {
    const {
      userStore: { user },
    } = useStore();

    const isExistInActivity =
      activity.attendees.map(
        (attendee) => {
          if (attendee) {
            const a = new Set(attendee);
          }
        }
      );

    {
      console.log(
        "isExistInActivity",
        isExistInActivity
      );
    }

    return (
      <Segment.Group>
        <Segment
          basic
          attached="top"
          style={{ padding: "0" }}
        >
          <Image
            src={`/assets/categoryImages/${activity.category?.toLowerCase()}.jpg`}
            fluid
            style={activityImageStyle}
          />
          <Segment
            style={
              activityImageTextStyle
            }
            basic
          >
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={
                      activity.title
                    }
                    style={{
                      color: "white",
                    }}
                  />
                  <p>
                    {format(
                      activity.date!,
                      "dd MMM yyyy h:mm aa"
                    )}
                  </p>
                  <p>
                    Hosted by{" "}
                    <strong>
                      {
                        activity.hostUsername
                      }
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment
          clearing
          attached="bottom"
        >
          <Button
            color="teal"
            disabled={false}
          >
            Join Activity
          </Button>
          <Button>
            Cancel attendance
          </Button>
          <Button
            color="orange"
            floated="right"
            as={Link}
            to={`/manage/${activity.id}`}
          >
            Manage Event
          </Button>
        </Segment>
      </Segment.Group>
    );
  }
);
