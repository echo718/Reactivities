import {
  Button,
  Icon,
  Item,
  Label,
  Segment,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import {
  SyntheticEvent,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ActivityAttendees } from "./ActivityAttendees";

interface Props {
  activity: Activity;
}

export const ActivityListItem = ({
  activity,
}: Props) => {
  const { activityStore } = useStore();
  const { loading } = activityStore;
  const [target, setTarget] =
    useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    activityStore.deleteActivity(id);
  };

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="/assets/user.png"
            />
            <Item.Content>
              <Item.Header
                as={Link}
                to={`/activities/${activity.id}`}
              >
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by{" "}
                {activity.hostUsername}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(
            activity.date!,
            "dd MMM yyyy h:mm aa"
          )}

          <Icon name="marker" />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        {activity.attendees.length >
        0 ? (
          <ActivityAttendees
            attendees={
              activity.attendees
            }
          />
        ) : (
          "No attendee yet"
        )}
      </Segment>
      <Segment clearing>
        <span>
          {activity.description}
        </span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
};
