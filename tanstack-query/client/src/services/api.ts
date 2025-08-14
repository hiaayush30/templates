import axios from "axios"
import type { Todo } from "../types/todo"

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({baseURL:BASE_URL})

export const getTodoIds = async () => {
    return (await axiosInstance.get<Todo[]>("todos")).data.map(todo=>todo.id)  // [1,2,3...]
}

export const getTodo = async (id:number) => {
    return (await axiosInstance.get<Todo>(`todos/${id}`)).data
}

export const createTodo = async(data:Todo) => {
    return (await axiosInstance.post<Todo>("todos",data))
}

export const updateTodo = async (data:Todo) => {
    return (await axiosInstance.put<Todo>("todos/"+data.id,data))
}