import { HeroesContext } from "../context/HeroesContext";

import { HeroCard } from "./HeroCard";
import { useHeroesContext } from "../customHooks/useHeroesContext";
import { PaginationContext } from "../context/PaginationContext";
import { TabsTypes } from "../types/TabsTypes";
import type { ICharacter } from "../interfaces/ICharacter";
import { FavoriteHeroesContext } from "../context/FavoriteHeroesContext";
import type { IFavoriteHero } from "../interfaces/IFavoriteHeroResponse";
import type { IHeroGridProps } from "../interfaces/IHeroGridProps";

export const HeroGridCard = (heroGridProps: IHeroGridProps) => {

    let heroes: ICharacter[] | IFavoriteHero[] = heroGridProps?.characters ?? [];
    const message = heroGridProps?.infoMessage ?? "Filter didn't get any result.";

    if (heroGridProps?.fromHomePage){
        const [pagination] = useHeroesContext(PaginationContext);

        if (pagination.category === TabsTypes.Favorites) {
            const favoritesResponse = useHeroesContext(FavoriteHeroesContext);
            heroes = favoritesResponse.FavoriteHeroes;
        }
        else {
            const {data: heroesData} = useHeroesContext(HeroesContext);
            heroes = heroesData?.heroes ?? [];
        }
    }

    return (
        <>
            {/* Characters List */}
            {(heroes && heroes.map((c, i) => {
                return (
                    <HeroCard key={i} {...c} />
                )
            }))}
            {(!heroes || heroes.length === 0) &&
             (<div>{message}</div>)}
        </>
    )
}
