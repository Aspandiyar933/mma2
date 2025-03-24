import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fighters from "./pages/Fighters";
import Events from "./pages/Events";
import CreateFighter from "./pages/CreateFighter";
import CreateEvent from "./pages/CreateEvents";
import RecordFight from "./pages/RecordFight";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import EventDetails from "./pages/EventDetails";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Fighters
          </Button>
          <Button color="inherit" component={Link} to="/create-fighter">
            Create Fighter
          </Button>
          <Button color="inherit" component={Link} to="/record-fight">
            Record Fight
          </Button>
          <Button color="inherit" component={Link} to="/events">
            Events
          </Button>
          <Button color="inherit" component={Link} to="/create-event">
            Create Event
          </Button>
          <Button color="inherit" component={Link} to="/rankings">
            Rankings
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Fighters />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/create-fighter" element={<CreateFighter />} />
          <Route path="/record-fight" element={<RecordFight />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
