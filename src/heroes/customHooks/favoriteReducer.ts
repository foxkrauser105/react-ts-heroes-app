import type { ICharacter } from "../interfaces/ICharacter";
import type { IFavoriteAction } from "../interfaces/IFavoriteAction";
import { HeroMiscConstants } from "../constants/HeroMiscConstants";

export const favoriteReducer = ( initialState: ICharacter[], action: IFavoriteAction ) => {

    if (!initialState){
        return [];
    }

    switch ( action.type ) {

        case HeroMiscConstants.ToggleFavoriteType:
            const newState = initialState.map( hero => {

                if ( hero.id === action.payload ) {
                    return {
                        ...hero
                    }
                } 

                return {...hero};
            });

            localStorage.setItem(HeroMiscConstants.FavoriteHeroesLSK, JSON.stringify(newState));

            return {...newState};

        case HeroMiscConstants.AddFavorites:       
            return {...action.heroes ?? []};
        
        default: 
            return {...initialState};
    }
}