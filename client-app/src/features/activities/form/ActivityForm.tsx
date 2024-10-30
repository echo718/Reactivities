import { Button, Header, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomTextInput } from '../../../app/common/form/CustomTextInput';
import { CustomTextArea } from '../../../app/common/form/CustomTextArea';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import { CustomSelect } from '../../../app/common/form/CustomSelect';
import { CustomDatePicker } from '../../../app/common/form/CustomDatePicker';
import { v4 as uuid } from 'uuid';

export const ActivityForm = observer(() => {
    const { activityStore } = useStore();
    const {
        createActivity,
        updateActivity,
        loading,
        loadActivity,
        loadingInitial
    } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: '',
        hostUsername: '',
        isCancelled: false,
        attendees: []
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required(
            'The activity description is required'
        ),
        category: Yup.string().required('The activity category is required'),
        date: Yup.string().required('The activity date is required'),
        venue: Yup.string().required('The activity venue is required'),
        city: Yup.string().required('The activity city is required')
    });

    useEffect(() => {
        if (id) loadActivity(id).then((activity) => setActivity(activity!));
    }, [id, loadActivity]);

    const handleFormSubmit = (activity: Activity) => {
        if (!activity.id) {
            activity.id = uuid();
            activity.isCancelled =
                activity.isCancelled.toString().toLocaleLowerCase() === 'false'
                    ? false
                    : true;
            createActivity(activity).then(() =>
                navigate(`/activities/${activity.id}`)
            );
        } else {
            activity.isCancelled =
                activity.isCancelled.toString().toLocaleLowerCase() === 'false'
                    ? false
                    : true;
            activity.attendees = [];
            updateActivity(activity).then(() =>
                navigate(`/activities/${activity.id}`)
            );
        }
    };

    // const handleChange = (
    //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //   const { name, value } = event.target;

    //   setActivity({ ...activity, [name]: value });
    // };

    if (loadingInitial) return <LoadingComponent />;

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={(activity) => handleFormSubmit(activity)}
            >
                {({ handleSubmit, isSubmitting, isValid }) => (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <Header as="h5" color="teal">
                            ACTIVITY DETAILS
                        </Header>
                        <CustomTextInput placeholder="Title" name="title" />
                        <CustomTextArea
                            placeholder="Description"
                            name="description"
                            rows={3}
                        />
                        <CustomSelect
                            placeholder="Category"
                            name="category"
                            options={categoryOptions}
                        />
                        <CustomDatePicker
                            placeholderText="Date"
                            showTimeSelect
                            timeCaption="time"
                            name="date"
                            dateFormat="MMMM d,yyyy h:mm aa"
                        />
                        <Header as="h5" color="teal">
                            LOCATION DETAILS
                        </Header>
                        <CustomTextInput placeholder="City" name="city" />
                        <CustomTextInput placeholder="Venue" name="venue" />
                        <Button
                            disabled={isSubmitting || !isValid}
                            floated="right"
                            positive
                            type="submit"
                            content="Submit"
                            loading={loading}
                        />
                        <Button
                            floated="right"
                            type="button"
                            content="Cancel"
                            as={Link}
                            to="/activities"
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});
