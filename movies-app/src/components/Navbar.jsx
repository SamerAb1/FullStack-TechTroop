import { useState } from "react";
import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  console.log(classes);

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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.link + " " + classes.active : classes.link
            }
          >
            Logout
          </NavLink>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
