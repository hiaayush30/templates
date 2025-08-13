// the middleware betn api..ts and the client for caching, revalidating, loadig states, errors etc

import { useQuery } from "@tanstack/react-query"
import { getTodoIds } from "./api"

export const useTodosIds = () => {
    return useQuery({
        queryKey: ['todos'], // this key will be used to revalidate this query
        queryFn: getTodoIds,
        refetchOnWindowFocus: false,
        // enabled:false   // disable or enable this query
    })
}