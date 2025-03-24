import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../api/events";
import { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [createEvent] = useMutation(CREATE_EVENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isoDate = new Date(date).toISOString();
    try {
      await createEvent({
        variables: { input: { name, location, date: isoDate } },
      });
      alert("Event Created Successfully!");
      setName("");
      setLocation("");
      setDate("");
    } catch (error) {
      alert("Error creating event: " + error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Create Event</Typography>
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <TextField
          label="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Date (YYYY-MM-DD)"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Event
        </Button>
      </Box>
    </Container>
  );
};

export default CreateEvent;
