import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Container, Header, Segment } from "semantic-ui-react";

export const ServerError = observer(() => {
  const { commonStore } = useStore();
  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={commonStore.error?.message} />
      {commonStore.error?.details && (
        <Segment>
          <Header as="h4" content="Stack trace" color="teal" />
          <code style={{ margin: "10px" }}>{commonStore.error?.details}</code>
        </Segment>
      )}
    </Container>
  );
});
