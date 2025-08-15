import { useIsFetching } from '@tanstack/react-query';
import { useTodos, useTodosIds } from '../services/queries'
import { useDeleteTodo } from '../services/mutations';

function Todos() {
    const todosIdQuery = useTodosIds();

    const isFetching = useIsFetching();

    // if (todosIdQuery.isPending) {
    //     return <span>Loading...</span>
    // }

    // if (todosIdQuery.isError) {
    //     return <span>There was an error in getting todos</span>
    // }

    const todoQueries = useTodos(todosIdQuery.data)

    const deleteTodoMutation = useDeleteTodo();
    const handleDelete = async (id: number) => {
        await deleteTodoMutation.mutateAsync(id)
        alert("Todo deleted!")
    }
    return (
        <>
            <div> Query fn status: {todosIdQuery.fetchStatus} </div>
            <div> Query status: {todosIdQuery.status} </div>
            <div> Global isFetching: {isFetching} </div>
            {
                todosIdQuery.data?.map(id => (
                    <div key={id}>
                        id:{id}
                    </div>
                ))
            }

            {
                todoQueries.map(({ data }) => (   // we are mapping an array of queries from each of which, we take the data i.e todo
                    <div key={data?.id}>
                        <ul>
                            <li>{data?.title}</li>
                            <li>{data?.description}</li>
                        </ul>
                        <button disabled={deleteTodoMutation.isPending} onClick={() => handleDelete(data?.id ?? 0)}>
                            {deleteTodoMutation.isPending ? "Deleting" : "Delete"}
                        </button>
                    </div>
                ))
            }
        </>
    )
}

export default Todos
