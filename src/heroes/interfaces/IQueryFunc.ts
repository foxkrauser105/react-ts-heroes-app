import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface IQueryFunc<T> { 
    data: T, 
    isLoading: boolean, 
    isError: boolean,
    error: any, 
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<unknown, Error>> 
}