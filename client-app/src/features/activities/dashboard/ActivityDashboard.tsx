import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleSelectedActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityDashboard = ({
  activities,
  selectedActivity,
  handleSelectedActivity,
  cancelSelectedActivity,
  editMode,
  openForm,
  closeForm,
  createOrEditActivity,
  deleteActivity,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectedActivity={cancelSelectedActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEditActivity={createOrEditActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
