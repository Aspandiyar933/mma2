import { useQuery, useMutation } from '@apollo/client';
import { GET_FIGHTERS, UPDATE_FIGHTER } from '../api/fighters';
import { useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const Fighters = () => {
  const { loading, error, data } = useQuery(GET_FIGHTERS);
  const [updateFighter] = useMutation(UPDATE_FIGHTER);
  const [bio, setBio] = useState('');
  const [currentFighterId, setCurrentFighterId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (fighterId: string, currentBio: string) => {
    setCurrentFighterId(fighterId);
    setBio(currentBio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFighterId(null);
    setBio('');
  };
  const handleUpdateBio = async () => {
    if (!currentFighterId) return;
  
    console.log('Updating fighter:', currentFighterId, 'Bio:', bio);
  
    try {
      await updateFighter({
        variables: {
          input: {
            fighterId: currentFighterId,
            bio,
          },
        },
      });
      alert('Bio updated successfully!');
      handleCloseModal();
    } catch (err: any) {
      console.error('GraphQL Error:', err);
      alert('Error updating bio: ' + err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading fighters!</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Fighters</Typography>
      {data.getFighters.map((fighter: any) => (
        <Box key={fighter.id} p={2} border={1} borderRadius={2} mb={2} display="flex" alignItems="center">
          {fighter.photoUrl && (
            <Avatar src={fighter.photoUrl} sx={{ width: 80, height: 80, mr: 2 }} />
          )}

          <Box>
            <Typography variant="h6">
              {fighter.firstName} {fighter.lastName}
            </Typography>
            <Typography>Weight Class: {fighter.weightClass}</Typography>
            <Typography>Bio: {fighter.bio || 'No bio available'}</Typography>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleOpenModal(fighter.id, fighter.bio || '')}
              sx={{ mt: 2 }}
            >
              Edit Bio
            </Button>
          </Box>
        </Box>
      ))}

      {/* Bio Edit Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Edit Fighter Bio</DialogTitle>
        <DialogContent>
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={4}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
          <Button onClick={handleUpdateBio} color="primary">Update Bio</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Fighters;
