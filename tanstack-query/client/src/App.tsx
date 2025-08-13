// import axios from "axios"
// import { useEffect, useState } from "react"

//@ts-ignore
import Todo from "./components/Todo"


function App() {

  // const [data, setData] = useState([])
  // useEffect(() => {
  //   axios
  //   .get("http://localhost:8080/todos")
  //   .then(res=> setData(res.data))
  //   .catch(err=> console.log(err))
  // })

  return (
    <div>
      <Todo/>
    </div>
  )
}

export default App
