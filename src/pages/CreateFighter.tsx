import { useMutation } from "@apollo/client";
import { CREATE_FIGHTER } from "../api/fighters";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";


const CreateFighter = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weightClass, setWeightClass] = useState("");
  const [nickname, setNickName] = useState("");
  const [wins, setWins] = useState<number>();
  const [losses, setLosses] = useState<number>();

  const [createFighter] = useMutation(CREATE_FIGHTER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFighter({
        variables: {
          input: {
            firstName,
            lastName,
            weightClass,
            nickname,
            wins,
            losses,
          },
        },
      });
      alert("Fighter Created Successfully!");
      setFirstName("");
      setLastName("");
      setWeightClass("");
      setNickName("");
      setWins(0);
      setLosses(0);
    } catch (error) {
      alert("Error creating fighter: " + error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Create Fighter</Typography>
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Weight Class"
          value={weightClass}
          onChange={(e) => setWeightClass(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Nickname"
          value={nickname}
          onChange={(e) => setNickName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Wins"
          type="number"
          value={wins}
          onChange={(e) => setWins(Number(e.target.value))}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Losses"
          type="number"
          value={losses}
          onChange={(e) => setLosses(Number(e.target.value))}
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
          Create Fighter
        </Button>
      </Box>
    </Container>
  );
};

export default CreateFighter;