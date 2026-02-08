import { LocalStorageUtils } from "@/shared/utils/localStorageUtils";
import type { IFavoriteHeroResponse } from "../interfaces/IFavoriteHeroResponse";
import { HeroMiscConstants } from "../constants/HeroMiscConstants";
import type { IFavoriteHero } from '../interfaces/IFavoriteHeroResponse';
import { useEffect, useState } from "react";
import type { ICharacter } from "../interfaces/ICharacter";

export function useFavorites(): IFavoriteHeroResponse {
       
    const savedFavorites = LocalStorageUtils.GetDataFromLocalStorage<IFavoriteHero[]>(HeroMiscConstants.FavoriteHeroesLSK, [] as IFavoriteHero[]);

    const [favorites, setFavorites] = useState<IFavoriteHero[]>(savedFavorites);

    const isFavorite = (character: ICharacter) => {
        return favorites.some(f => f.id === character.id); 
    }

    const toggleFavorite = (fav: IFavoriteHero) => {

        const favorite = favorites.find(f => f.id === fav.id);

        if (favorite) {
            setFavorites(favorites.filter(f => f.id !== favorite.id));
            //LocalStorageUtils.SetDataToLocalStorage(HeroMiscConstants.FavoriteHeroesLSK, favorites); This doesn't work bc setFavorites is async
            return;
        }
        
        setFavorites([...favorites, fav]);
        //LocalStorageUtils.SetDataToLocalStorage(HeroMiscConstants.FavoriteHeroesLSK, favorites);
    }

    useEffect(() => {
        LocalStorageUtils.SetDataToLocalStorage(HeroMiscConstants.FavoriteHeroesLSK, favorites);
    }, [favorites]);

    return {
        FavoriteHeroes: favorites,
        FavoriteHeroesCount: favorites.length,
    
        IsFavorite: isFavorite,
        ToggleFavorite: toggleFavorite
    } as IFavoriteHeroResponse;
}