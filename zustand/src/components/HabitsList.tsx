import useHabitStore from '../store/store'
import { Box, Button, Typography } from '@mui/material';

function HabitsList() {
    const { habits,removeHabit,toggleHabit } = useHabitStore();
    const today = new Date().toISOString().split("T")[0];

    return (
        <div>
            {habits.map((habit) => {
                return <Box key={habit.id} sx={{ border: "1px solid black", margin: "10px", borderRadius: "5px" }} p={"10px"}>
                    <Typography variant='h3'>{habit.name}</Typography>
                    <Typography variant='h5'>{habit.frequency}</Typography>
                    <Typography>{habit.createdAt}</Typography>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "right" }}>
                        <Button 
                        onClick={()=> toggleHabit(habit.id,today)}
                        variant='outlined'
                            color={
                                habit.completedDates.includes(today)
                                    ? "success"
                                    : "info"
                            }
                        >
                            {
                                habit.completedDates.includes(today)
                                    ? "Completed"
                                    : "Mark as Done"
                            }
                        </Button>
                        <Button onClick={()=>removeHabit(habit.id)} variant='contained' color='error'>Remove</Button>
                    </div>
                </Box>
            })}
        </div>
    )
}

export default HabitsList
