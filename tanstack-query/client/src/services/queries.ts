// the middleware betn api..ts and the client for caching, revalidating, loadig states, errors etc

import { useQueries, useQuery } from "@tanstack/react-query"
import { getTodo, getTodoIds } from "./api"

export const useTodosIds = () => {
    return useQuery({
        queryKey: ['todos'], // this key will be used to revalidate this query
        queryFn: getTodoIds,
        refetchOnWindowFocus: false,
        // enabled:false   // disable or enable this query
    })
}

export const useTodos = (ids:(number | undefined)[] | undefined ) => {
    return useQueries({   //useQueries is used when we want to fetch multiple queries that we don't know how many
        queries: (ids ?? []).map((id)=>{
            return {
                queryKey:["todo",id],
                queryFn: async () => await getTodo(id!)
            }
        })
    })
}