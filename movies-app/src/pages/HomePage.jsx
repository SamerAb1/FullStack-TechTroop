import { Button, Container, Group, Text } from "@mantine/core";
import classes from "./HomePage.module.css";
import { Link } from "react-router";

function HomePage() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          An amazing{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Movie Application
          </Text>{" "}
          to show case React's Features 🎥
        </h1>

        {/* <Text className={classes.description} color="dimmed">
          Don't hesitate and login 
        </Text> */}

        <Group className={classes.controls}>
          <Button
            component={Link}
            to="/login"
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Get started
          </Button>
        </Group>
      </Container>
    </div>
  );
}

export default HomePage;
