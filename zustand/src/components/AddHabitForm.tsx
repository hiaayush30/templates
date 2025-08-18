import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import useHabitStore from '../store/store'

function AddHabitForm() {
  const [name, setName] = useState("")
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily")

  const {habits,addHabit} = useHabitStore();
  const handleSubmit = async (e:React.FormEvent) =>{
      e.preventDefault();
      if(name.trimEnd()){
        addHabit(name,frequency)
        setName("");
      }
  }
  console.log(habits)
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{
        display:"flex",
        flexDirection:"column",
        gap:2
      }}>
        <TextField label={"Habit name"} value={name} onChange={(e) => setName(e.target.value)}/>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={frequency}
            label="Age"
            onChange={(e)=>setFrequency(e.target.value as "daily"|"weekly")}
          >
            <MenuItem value={"daily"}>Daily</MenuItem>
            <MenuItem value={"weekly"}>Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type='submit' variant='contained'>ADD HABIT</Button>
      </Box>
    </form>
  )
}

export default AddHabitForm
