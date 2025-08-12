import { Card, Image, Text } from "@mantine/core";

function ActorCard({ actor }) {
  const actorImg = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Card.Section>
        <Image src={actorImg} alt={actor.name} />
      </Card.Section>
      <Text fw={800}>{actor.name}</Text>
    </Card>
  );
}

export default ActorCard;
