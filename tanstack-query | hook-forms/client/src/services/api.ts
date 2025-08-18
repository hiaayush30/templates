import axios from "axios"
import type { Todo } from "../types/todo"
import type { Project } from "../types/projects"
import type { Product } from "../types/products"

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
     await axiosInstance.put<Todo>("todos/"+data.id,data)
}

export const deleteTodo = async (id:number) => {
     await axiosInstance.delete("todos/"+id)
}

export const getProjects = async (page=1) => {
    return (await axiosInstance.get<Project[]>("projects?_page="+page+"&_limit=3")).data
}

export const getProducts = async ({pageParam}:{pageParam:number}) => {
    return (await axiosInstance.get<Product[]>("products?_page="+(pageParam+1)+"&_limit=3")).data
}

export const getProduct = async (id:number) =>{
         return (await axiosInstance.get<Product>("products/"+id)).data
}