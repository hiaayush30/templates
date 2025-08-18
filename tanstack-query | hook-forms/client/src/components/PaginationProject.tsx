import { useState } from "react"
import { useProjects } from "../services/queries";

function PaginationProject() {
    const [page, setPage] = useState(1);
    const { data, isPending, isError,isPlaceholderData,isFetching } = useProjects(page)

    if (isPending) {
        return <div>Loading projects...</div>
    }
    else if (isError) {
        return <div>Fetching projects failed spectactularly!</div>
    }
    else {
        return (
            <div>
                <div>Curr Page:{page}</div>
                <button disabled={page<=1 || isPlaceholderData} onClick={()=>setPage(page-1)}>Prev page</button>
                <button disabled={isPlaceholderData} onClick={()=>setPage(page+1)}>Next page</button>
                {isFetching? "Loading...":null}
                {data.map(project => (
                    <div key={project.id}>
                        <div>{project.id}</div>
                        <h3>{project.name}</h3>
                    </div>
                ))}
            </div>
        )
    }
}

export default PaginationProject
