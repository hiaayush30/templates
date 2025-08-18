// the middleware betn api..ts and the client for caching, revalidating, loadig states, errors etc

import { useQueryClient,keepPreviousData, useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query"
import { getProduct, getProducts, getProjects, getTodo, getTodoIds } from "./api"
import type { Product } from "../types/products"

export const useTodosIds = () => {
    return useQuery({
        queryKey: ['todos'], // this key will be used to revalidate this query
        queryFn: getTodoIds,
        refetchOnWindowFocus: false,
        // enabled:false   // disable or en able this query
    })
}

export const useTodos = (ids: (number | undefined)[] | undefined) => {
    return useQueries({   //useQueries is used when we want to fetch multiple queries that we don't know how many
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ["todo", id],
                queryFn: async () => await getTodo(id!)
            }
        })
    })
}


//pagination
export function useProjects(page: number) {
    return useQuery({
        queryKey: ["projects",page],
        queryFn: async () => getProjects(page),
        placeholderData: keepPreviousData,  // while the next page data loads it will show the previous page data
        refetchOnWindowFocus: false
    })
}

//infinite scrolling
export function useProducts(){
    return useInfiniteQuery({
        queryKey:["products"],
        queryFn:getProducts,
        initialPageParam:0,
        getNextPageParam:(lastPage,allPages,lastPageParam) => {
             if(lastPage.length === 0){
                return undefined
             }
             return lastPageParam +1;
        },
        getPreviousPageParam: (firstPage,allPages,firstPageParam)=>{
            if(firstPageParam <= 1){
                return undefined;
            }
            return firstPageParam -1
        }
    })
}

export function useProduct(id:number | null){
    const queryCLient = useQueryClient();

    return useQuery({
        queryKey : ["product",id],
        queryFn:()=> getProduct(id!),
        enabled:id ? true : false,
        placeholderData: () => {
            const cachedProducts = (queryCLient.getQueryData(["products"]) as { pages: Product[] | undefined})?.pages?.flat(2)
            if(cachedProducts){
                return cachedProducts.find(item => item.id)
            }
        }
    })
}