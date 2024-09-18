import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface CustomSelectProps {
  name: string;
  placeholder: string;
  options: { text: string; value: string }[];
  label?: string;
  type?: string;
}

export const CustomSelect = (props: CustomSelectProps) => {
  const [field, meta, helper] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        value={field.value}
        placeholder={props.placeholder}
        onChange={(_, d) => {
          helper.setValue(d.value);
        }}
        onBlur={() => helper.setTouched(true)}
        options={props.options}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
