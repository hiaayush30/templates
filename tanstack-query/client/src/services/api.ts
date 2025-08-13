import axios from "axios"
import type { Todo } from "../types/todo"

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({baseURL:BASE_URL})

export const getTodoIds = async () => {
    return (await axiosInstance.get<Todo[]>("todos")).data.map(todo=>todo.id)  // [1,2,3...]
}