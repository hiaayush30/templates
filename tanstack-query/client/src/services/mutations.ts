import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Todo } from "../types/todo"
import { createTodo, updateTodo } from "./api"

export function useCreateTodo() {
    const queryCLient = useQueryClient();

    return useMutation({
        mutationFn: (data: Todo) => createTodo(data),
        onMutate: () => {  // will run before creating todo fn
            console.log("mutate")
        },
        onSuccess: () => {
            console.log("success")
        },
        onError: () => {
            console.log("error")
        },
        onSettled: async (data, error, variables) => {  // will always run (error or not) 
            // variables is the data you passed to the muatation ie the todo data here
            if (error) {
                console.log(error)
            } else {
                await queryCLient.invalidateQueries({queryKey:["todos"]})
            }
        }
    })
}

export function useUpdateTodo(){
    const queryCLient = useQueryClient();

    return useMutation({
        mutationFn:(data:Todo) => updateTodo(data),
                onSettled: async (data, error, variables) => {  
            if (error) {
                console.log(error)
            } else {
                await queryCLient.invalidateQueries({queryKey:["todos",variables.id]})
            }
        }
    })
}