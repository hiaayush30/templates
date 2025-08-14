import { useIsFetching } from '@tanstack/react-query';
import { useTodos, useTodosIds } from '../services/queries'

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
                    </div>
                ))
            }
        </>
    )
}

export default Todos
