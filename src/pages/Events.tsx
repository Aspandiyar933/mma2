import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTS, DELETE_EVENT } from '../api/events';
import { Container, Typography, CircularProgress, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Events = () => {
  const { loading, error, data, refetch } = useQuery(GET_EVENTS);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDelete = async (eventId: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteEvent({ variables: { eventId } });
      alert('Event deleted successfully');
      refetch(); // Refresh the event list
    } catch (err:any) {
      alert('Error deleting event: ' + err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading events!</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Events</Typography>
      {data.getAllEvents.map((event: any) => (
        <Box key={event.id} p={2} border={1} borderRadius={2} mb={2}>
          <Typography variant="h6">{event.name}</Typography>
          <Typography>Location: {event.location}</Typography>
          <Typography>Date: {new Date(event.date).toDateString()}</Typography>

          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={`/events/${event.id}`}
            sx={{ mt: 2, mr: 2 }}
          >
            View Details
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(event.id)}
            sx={{ mt: 2 }}
          >
            Delete Event
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default Events;
