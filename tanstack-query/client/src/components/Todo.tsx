import { useTodosIds } from '../services/queries'
import type { Todo } from '../types/todo'

function Todo() {
    const todosIdQuery = useTodosIds();

    if (todosIdQuery.isLoading) {
        return <span>Loading...</span>
    }

    if (todosIdQuery.isError) {
        return <span>There was an error in getting todos</span>
    }

    return (
        <>
        <div> Query fn status </div>
        todosIdQuery.data?.map(id => (
            <div key={id}>
                {id}
            </div>
        ))
        </div>
    )
}

export default Todo
