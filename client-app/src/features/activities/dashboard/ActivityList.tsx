import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  handleSelectedActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityList = ({
  activities,
  handleSelectedActivity,
  deleteActivity,
}: Props) => {
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
                  onClick={() => deleteActivity(activity.id)}
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
