import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./LoginPage.module.css";
import { useState } from "react";
import { Link } from "react-router";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet? <Anchor>Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput
          label="Email"
          required
          radius="md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <Button fullWidth mt="xl" radius="md" component={Link} to="/movies">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
