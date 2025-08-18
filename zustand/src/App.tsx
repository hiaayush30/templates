import { Box, Container, Typography } from "@mui/material"
import useHabitStore from "./store/store"
import AddHabitForm from "./components/AddHabitForm";
import HabitsList from "./components/HabitsList";
import { useEffect } from "react";

function App() {
  const store = useHabitStore();
  useEffect(() => {
    store.fetchHabits()
  }, [])
  console.log(store)
  return (
    <Container>
      <Box>
        <Typography variant="h2" component={"h1"}>
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitsList />
        {/* stats */}
      </Box>
    </Container>
  )
}

export default App
