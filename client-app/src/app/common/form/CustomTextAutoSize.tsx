import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

interface TextareaAutosizeProps {
    name: string;
    placeholder?: string;
    label?: string;
    type?: string;
    minRows?: number;
}

export const CustomTextareaAutosize = (props: TextareaAutosizeProps) => {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <TextareaAutosize
                {...field}
                {...props}
                value={field.value || ''}
                minRows={props.minRows}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red">
                    {meta.error}
                </Label>
            ) : null}
        </Form.Field>
    );
};
