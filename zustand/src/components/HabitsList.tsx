import useHabitStore, { type Habit } from '../store/store'
import { Box, Button, Typography } from '@mui/material';

function HabitsList() {
    const { habits, removeHabit, toggleHabit } = useHabitStore();
    const today = new Date().toISOString().split("T")[0];

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currDate = new Date()
        while (true) {
            const dateString = currDate.toISOString().split("T")[0]
            if (habit.completedDates.includes(dateString)) {
                streak++
                currDate.setDate(currDate.getDate()-1)  // set date to previous date and check again
            } else {
                break;
            }
        }
        return streak;
    }

    return (
        <div>
            {habits.map((habit) => {
                return <Box key={habit.id} sx={{ border: "1px solid black", margin: "10px", borderRadius: "5px" }} p={"10px"}>
                    <Typography variant='h3'>{habit.name}</Typography>
                    <Typography variant='h5'>{habit.frequency}</Typography>
                    <Typography>{habit.createdAt}</Typography>
                    <div style={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "right" }}>
                        <Button
                            onClick={() => toggleHabit(habit.id, today)}
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
                        <Button onClick={() => removeHabit(habit.id)} variant='contained' color='error'>Remove</Button>
                    </div>
                    <div>
                        Current Streak: {getStreak(habit)}
                    </div>
                </Box>
            })}
        </div>
    )
}

export default HabitsList
