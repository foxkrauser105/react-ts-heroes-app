import { useReducer } from 'react';
import type { ICharacter } from "../interfaces/ICharacter";
import { HeroMiscConstants } from "../constants/HeroMiscConstants";
import { favoriteReducer } from "./favoriteReducer";

export const init = (i?: ICharacter[]): ICharacter[] => {
    
    const savedHeroes: ICharacter[] = JSON.parse(localStorage.getItem(HeroMiscConstants.FavoriteHeroesLSK) ?? "[]") || [] as ICharacter[];
    
    if (savedHeroes?.length > 0 && i?.length! > 0) {
        for(const hero of savedHeroes){
            const newHeroData = i?.find(h => h.id === hero.id);

            if (newHeroData){
                newHeroData.isFavorite = true;
            }
        }
    }

    return i ?? [] as ICharacter[];
}

export const useFavoriteReducer = (initialState?: ICharacter[]) => {

    const [, dispatch] = useReducer(favoriteReducer, initialState, init);

    const ToggleFavorite = (id: string): void => {
        
        if (!id){
            return;
        }
    
        dispatch({
            type: HeroMiscConstants.ToggleFavoriteType,
            payload: id
        });
    }

    return ToggleFavorite;
}