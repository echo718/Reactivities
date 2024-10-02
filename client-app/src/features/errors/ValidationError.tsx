import { Message } from "semantic-ui-react";

interface Props {
  errors: string[];
}

export const ValidationError = ({ errors }: Props) => {
  console.log('errors',errors);
  return (
    <Message error>
      
      {errors && (
        <Message.List>
       
          {errors.map((err: string, index) => (
            <Message.Item key={index}>{err}</Message.Item>
          ))}
          )
        </Message.List>
      )}
    </Message>
  );
};
