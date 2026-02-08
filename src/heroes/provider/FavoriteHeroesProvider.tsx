import type { PropsWithChildren } from "react";
import { FavoriteHeroesContext } from "../context/FavoriteHeroesContext";
import { useFavorites } from "../customHooks/useFavorites";

export const FavoriteHeroesProvider = ({ children }: PropsWithChildren) => {

    const favorites = useFavorites();

    return (
        <FavoriteHeroesContext.Provider value={favorites}>
            {children}
        </FavoriteHeroesContext.Provider>
    )
}