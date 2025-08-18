import { Box, Container, Typography } from "@mui/material"
import useHabitStore from "./store/store"
import AddHabitForm from "./components/AddHabitForm";
import HabitsList from "./components/HabitsList";

function App() {
  const store = useHabitStore();
  console.log(store)
  return (
    <Container>
      <Box>
        <Typography variant="h2" component={"h1"}>
          Habit Tracker
        </Typography>
        <AddHabitForm/>
        <HabitsList/>
        {/* stats */}
      </Box>
    </Container>
  )
}

export default App
