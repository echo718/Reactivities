import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useStore } from '../../../../../app/stores/store';
import { BasicDetail } from '../../../../../app/models/user';
import { CustomTextInput } from '../../../../../app/common/form/CustomTextInput';
import { CustomTextareaAutosize } from '../../../../../app/common/form/CustomTextAutoSize';

interface UpdateProfileFormProps {
    bio?: string;
    displayName?: string;
    onCancel: () => void;
}

export const UpdateProfileForm = observer((props: UpdateProfileFormProps) => {
    const { profileStore } = useStore();
    const { updateProfileBasicDetails } = profileStore;

    const profile: BasicDetail = {
        displayName: props.displayName ?? '',
        bio: props.bio
    };

    const validationSchema = Yup.object({
        displayName: Yup.string().required(
            'The display nName title is required'
        ),
        bio: Yup.string()
    });

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={profile}
                onSubmit={(basicDetails: BasicDetail) =>
                    updateProfileBasicDetails(basicDetails)
                }
            >
                {({ handleSubmit, isSubmitting, isValid }) => (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <CustomTextInput
                            placeholder={profile.displayName}
                            name="displayName"
                        />
                        <CustomTextareaAutosize
                            name="bio"
                            minRows={3}
                            placeholder={profile.bio}
                        />

                        <Button
                            disabled={isSubmitting || !isValid}
                            floated="right"
                            positive
                            type="submit"
                            content="Submit"
                        />
                        <Button
                            floated="right"
                            type="button"
                            content="Cancel"
                            onClick={props.onCancel}
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
});
