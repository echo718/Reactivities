import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

export const CustomDatePicker = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helper] = useField(props.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <ReactDatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helper.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
