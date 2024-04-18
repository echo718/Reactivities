import { useField } from "formik";
import { Form, Label, TextArea } from "semantic-ui-react";

interface TextAreaProps {
  name: string;
  placeholder: string;
  rows: number;
  label?: string;
  type?: string;
}

export const CustomTextArea = (props: TextAreaProps) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <TextArea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
