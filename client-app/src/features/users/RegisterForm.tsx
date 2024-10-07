import { ErrorMessage, Formik } from "formik";
import { Form } from "react-router-dom";
import { CustomTextInput } from "../../app/common/form/CustomTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { ValidationError } from "../errors/ValidationError";

export const RegisterForm = observer(() => {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{
        displayName: "",
        usernName: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {
        //task: figure out function logic
        ({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
          <Form
            className="ui form error"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Header
              as="h2"
              content="Sign up to activities"
              color="teal"
              textAlign="center"
            />
            <CustomTextInput placeholder="DisplayName" name="displayName" />
            <CustomTextInput placeholder="UserName" name="userName" />
            <CustomTextInput placeholder="Email" name="email" />
            <CustomTextInput
              placeholder="Password"
              name="password"
              type="password"
            />
            <ErrorMessage
              name="error"
              render={() => (
                <ValidationError errors={errors.error as unknown as string[]} />
              )}
            />
            <Button
              isloading={isSubmitting.toString()}
              positive
              disabled={!isValid || !dirty || isSubmitting}
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
