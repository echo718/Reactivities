import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { SyntheticEvent, useState } from "react";

interface Props {
  activities: Activity[];
  handleSelectedActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export const ActivityList = ({
  activities,
  handleSelectedActivity,
  deleteActivity,
  submitting,
}: Props) => {
  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>{activity.description}</Item.Description>
              <Item.Description>{activity.city}</Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => handleSelectedActivity(activity.id)}
                ></Button>
                <Button
                  floated="right"
                  content="Delete"
                  color="red"
                  name={activity.id}
                  loading={submitting && target == activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
