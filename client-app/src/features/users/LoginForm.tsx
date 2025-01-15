import { ErrorMessage, Formik } from 'formik';
import { Form } from 'react-router-dom';
import { CustomTextInput } from '../../app/common/form/CustomTextInput';
import { Button, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

export const LoginForm = observer(() => {
    const { commonStore, userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore
                    .login(values)
                    .then(() => {
                        commonStore.setAppLoaded(true);
                    })
                    .catch(() => {
                        setErrors({ error: 'Invalid email or password' });
                        commonStore.setAppLoaded(false);
                    });

                console.log(' commonStore.setAppLoaded();');
            }}
        >
            {
                //task: figure out function logic
                ({ handleSubmit, isSubmitting, errors }) => (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <Header
                            as="h2"
                            content="Login to activities"
                            color="teal"
                            textAlign="center"
                        />
                        <CustomTextInput placeholder="Email" name="email" />
                        <CustomTextInput
                            placeholder="Password"
                            name="password"
                            type="password"
                        />
                        <ErrorMessage
                            name="error"
                            render={() => (
                                <Label
                                    style={{ marginBottom: 10 }}
                                    basic
                                    color="red"
                                    content={errors.error}
                                />
                            )}
                        />
                        <Button
                            isloading={isSubmitting.toString()}
                            positive
                            content="Login"
                            type="submit"
                            fluid
                        />
                    </Form>
                )
            }
        </Formik>
    );
});
