// import axios from "axios"
// import { useEffect, useState } from "react"

//@ts-ignore
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTodo, useUpdateTodo } from "./services/mutations"
import type { Todo } from "./types/todo";
import Todos from "./components/Todos";


function App() {

  // const [data, setData] = useState([])
  // useEffect(() => {
  //   axios
  //   .get("http://localhost:8080/todos")
  //   .then(res=> setData(res.data))
  //   .catch(err=> console.log(err))
  // })

  const createTodoMutation = useCreateTodo();
  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data)
  }
  const { register, handleSubmit } = useForm<Todo>()

  const updateTodoMutation = useUpdateTodo();
  const handleUpdateTodoSubmit: SubmitHandler<Todo> = (data) => {
    updateTodoMutation.mutate(data)
  }
  const updateForm = useForm<Todo>()
  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h2>New Todo:</h2>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input type="submit" disabled={createTodoMutation.isPending} value={createTodoMutation.isPending ? "Creating" : "Submit"} />
      </form>
      <hr />
      <form onSubmit={updateForm.handleSubmit(handleUpdateTodoSubmit)}>
        <h2>Update Todo:</h2>
        <input placeholder="Id" {...updateForm.register("id")} />
        <input placeholder="Title" {...updateForm.register("title")} />
        <br />
        <input placeholder="Description" {...updateForm.register("description")} />
        <br />
        <input type="submit" disabled={updateTodoMutation.isPending} value={updateTodoMutation.isPending ? "Updating" : "Update"} />
      </form>
      <hr />
      <Todos />
    </div>
  )
}

export default App
