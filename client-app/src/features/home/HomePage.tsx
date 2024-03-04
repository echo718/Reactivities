import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export const HomePage = () => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>Home Page</h1>
      <h2>
        go to <Link to={"/activities"}>activities</Link>
      </h2>
    </Container>
  );
};
