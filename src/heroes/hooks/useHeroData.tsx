import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import type { IPagination } from "../interfaces/IPagination";

export const useHeroData = (pagination: IPagination) => {
    return useQuery({
        queryKey: ['heroes', pagination],
        queryFn: () => getHeroesByPageAction(pagination),
        staleTime: 1000 * 60 * 5, //5 mins
    });
}