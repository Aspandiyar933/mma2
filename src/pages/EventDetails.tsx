import { useQuery } from '@apollo/client';
import { GET_EVENT_BY_ID } from '../api/events';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
    variables: { eventId: id },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading event: {error.message}</Typography>;
  if (!data?.getEventById) return <Typography>No event found!</Typography>;

  const { name, location, date, fights } = data.getEventById;

  return (
    <Container>
      <Typography variant="h4">{name}</Typography>
      <Typography>Location: {location}</Typography>
      <Typography>Date: {new Date(date).toDateString()}</Typography>

      <Typography variant="h5" mt={4}>Fights:</Typography>
      {fights.length === 0 ? (
        <Typography>No fights recorded for this event.</Typography>
      ) : (
        fights.map((fight: any) => (
          <Box key={fight.id} p={2} border={1} borderRadius={2} mb={2}>
            <Typography variant="h6">
              {fight.fighter1.firstName} {fight.fighter1.lastName} vs. {fight.fighter2.firstName} {fight.fighter2.lastName}
            </Typography>
            <Typography>Method: {fight.method} (Round {fight.round})</Typography>
            {fight.winner ? (
              <Typography>Winner: {fight.winner.firstName} {fight.winner.lastName}</Typography>
            ) : (
              <Typography>Result: Draw/No Contest</Typography>
            )}
          </Box>
        ))
      )}
    </Container>
  );
};

export default EventDetails;
