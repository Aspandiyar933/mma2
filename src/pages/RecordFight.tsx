import { useMutation, useQuery } from '@apollo/client';
import { RECORD_FIGHT, GET_FIGHTERS, GET_EVENTS } from '../api/fights';
import { useState } from 'react';
import { Container, Typography, Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const RecordFight = () => {
  const [eventId, setEventId] = useState('');
  const [fighter1Id, setFighter1Id] = useState('');
  const [fighter2Id, setFighter2Id] = useState('');
  const [winnerId, setWinnerId] = useState('');
  const [method, setMethod] = useState('');
  const [round, setRound] = useState(1);

  // Fetch events and fighters
  const { loading: loadingFighters, data: fighterData } = useQuery(GET_FIGHTERS);
  const { loading: loadingEvents, data: eventData } = useQuery(GET_EVENTS);

  const [recordFight] = useMutation(RECORD_FIGHT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await recordFight({
        variables: {
          input: { eventId, fighter1Id, fighter2Id, winnerId, method, round },
        },
      });
      alert('Fight Recorded!');
      // Reset form
      setEventId('');
      setFighter1Id('');
      setFighter2Id('');
      setWinnerId('');
      setMethod('');
      setRound(1);
    } catch (error:any) {
      alert('Error recording fight: ' + error.message);
    }
  };

  if (loadingFighters || loadingEvents) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">Record a Fight</Typography>
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        {/* Event Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Event</InputLabel>
          <Select value={eventId} onChange={(e) => setEventId(e.target.value)}>
            {eventData?.getAllEvents.map((event: any) => (
              <MenuItem key={event.id} value={event.id}>
                {event.name} ({new Date(event.date).toLocaleDateString()})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Fighter 1 Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Fighter 1</InputLabel>
          <Select value={fighter1Id} onChange={(e) => setFighter1Id(e.target.value)}>
            {fighterData?.getFighters.map((fighter: any) => (
              <MenuItem key={fighter.id} value={fighter.id}>
                {fighter.firstName} {fighter.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Fighter 2 Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Fighter 2</InputLabel>
          <Select value={fighter2Id} onChange={(e) => setFighter2Id(e.target.value)}>
            {fighterData?.getFighters.map((fighter: any) => (
              <MenuItem key={fighter.id} value={fighter.id}>
                {fighter.firstName} {fighter.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Winner Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Winner (Optional)</InputLabel>
          <Select value={winnerId} onChange={(e) => setWinnerId(e.target.value)}>
            {[fighter1Id, fighter2Id].map((id) => {
              const fighter = fighterData?.getFighters.find((f: any) => f.id === id);
              return fighter ? (
                <MenuItem key={id} value={id}>
                  {fighter.firstName} {fighter.lastName}
                </MenuItem>
              ) : null;
            })}
          </Select>
        </FormControl>

        {/* Method Input */}
        <TextField
          label="Method (KO, Submission, Decision, etc.)"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        {/* Round Input */}
        <TextField
          label="Round"
          type="number"
          value={round}
          onChange={(e) => setRound(Number(e.target.value))}
          fullWidth
          required
          margin="normal"
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit Fight
        </Button>
      </Box>
    </Container>
  );
};

export default RecordFight;
