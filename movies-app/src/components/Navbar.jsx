import { useState } from "react";
import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthProvider";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const { onLogout } = useAuth();
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group gap={5} visibleFrom="xs">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? classes.link + " " + classes.active : classes.link
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/actors"
            className={({ isActive }) =>
              isActive ? classes.link + " " + classes.active : classes.link
            }
          >
            Actors
          </NavLink>
        </Group>
        <Group gap={5} visibleFrom="xs">
          <a onClick={onLogout} className={classes.link}>
            Logout
          </a>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
