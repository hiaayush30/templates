import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, frequency: "daily" | "weekly") => void;
    removeHabit: (id: string) => void;
    toggleHabit: (id: string, date: string) => void;
}

// create<State>() returns another function waiting for your store creator.
// That’s why you call it again with (persist(...)). (iife)

// 🛠 Why not just create<HabitState>(persist(...))?
// That syntax works without persist, but with middlewares (persist, devtools, etc.), TypeScript needs the curried form to infer the types correctly.

const useHabitStore = create<HabitState>()(
    persist<HabitState>(
        (set) => ({
            habits: [],
            addHabit: (name, frequency) =>
                set((state) => ({
                    habits: [
                        ...state.habits,
                        {
                            id: Date.now().toString(),
                            name,
                            frequency,
                            completedDates: [],
                            createdAt: new Date().toISOString(),
                        },
                    ],
                })),
            removeHabit: (id) =>
                set((state) => ({
                    habits: state.habits.filter((habit) => habit.id !== id),
                })),
            toggleHabit: (id, date) =>
                set((state) => ({
                    habits: state.habits.map((habit) =>
                        habit.id === id
                            ? {
                                  ...habit,
                                  completedDates: habit.completedDates.includes(date)
                                      ? habit.completedDates.filter((d) => d !== date)
                                      : [...habit.completedDates, date],
                              }
                            : habit
                    ),
                })),
        }),
        {
            name: "habits-local", // key in localStorage
        }
    )
);

export default useHabitStore;
