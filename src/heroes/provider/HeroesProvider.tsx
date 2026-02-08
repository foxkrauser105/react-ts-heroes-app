import { useMemo, useState, type PropsWithChildren } from "react";
import { useSearchParams } from "react-router";

import { HeroesContext } from "../context/HeroesContext";
import type { IPagination } from "../interfaces/IPagination";
import { PaginationContext } from "../context/PaginationContext";
import type { IQueryFunc } from "../interfaces/IQueryFunc";
import type { IHeroResponse } from "../interfaces/IHeroResponse";
import { PaginationFactory } from "@/shared/utils/paginationUtils";
import type { ISummaryResponse } from "../interfaces/ISummaryResponse";
import { SummaryContext } from "../context/SummaryContext";
import { FavoriteHeroesContext } from "../context/FavoriteHeroesContext";
import { useFavorites } from "../customHooks/useFavorites";
import { URLParamKeysTypes } from "../types/URLParamKeysTypes";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { useHeroData } from "../hooks/useHeroData";

export const HeroesProvider = ({ children }: PropsWithChildren) => {

    const [searchParams] = useSearchParams();
    
    const initialPage = searchParams.get(URLParamKeysTypes.Page);
    const initialLimit = searchParams.get(URLParamKeysTypes.Limit);
    const initialTab = searchParams.get(URLParamKeysTypes.Tab)
    const initialPagination = PaginationFactory.CreatePaginationObject(initialPage, initialLimit, initialTab);

    const [pagination, setPagination] = useState<IPagination>(initialPagination);

    const favoritesData = useFavorites();

    const heroData: IQueryFunc<IHeroResponse | undefined> = useHeroData(pagination);

    const summaryData: IQueryFunc<ISummaryResponse | undefined> = useHeroSummary();

    const paginationValue = useMemo<[IPagination, React.Dispatch<React.SetStateAction<IPagination>>]>(() => [pagination, setPagination], [pagination]);

    return (
        <HeroesContext.Provider value={heroData}>
            <PaginationContext.Provider value={paginationValue}>
                <SummaryContext.Provider value={summaryData}>
                    <FavoriteHeroesContext.Provider value={favoritesData}>
                        { children }
                    </FavoriteHeroesContext.Provider>
                </SummaryContext.Provider>
            </PaginationContext.Provider>
        </HeroesContext.Provider>
    );
}