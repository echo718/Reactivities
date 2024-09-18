import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { ActivityListItem } from "./ActivityListItem";
import { Fragment } from "react";

export const ActivityList = observer(() => {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <Fragment>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {activities.map((activity) => (
            <ActivityListItem activity={activity} key={activity.id} />
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
});
