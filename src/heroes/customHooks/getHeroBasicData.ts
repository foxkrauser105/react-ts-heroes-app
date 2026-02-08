import type { IQueryFunc } from '../interfaces/IQueryFunc';
import type { IHeroResponse } from '../interfaces/IHeroResponse';
import { HeroesContext } from '../context/HeroesContext';
import { SummaryContext } from '../context/SummaryContext';
import { CharacterTypes } from '../types/CharacterTypes';
import type { IHeroBasicData } from '../interfaces/IHeroBasicData';
import type { ISummaryResponse } from '../interfaces/ISummaryResponse';
import { useHeroesContext } from './useHeroesContext';
import type { IFavoriteHeroResponse } from '../interfaces/IFavoriteHeroResponse';
import { FavoriteHeroesContext } from '../context/FavoriteHeroesContext';

export const GetHeroBasicData = (): IHeroBasicData => {
  
    const summaryData: IQueryFunc<ISummaryResponse | undefined> = useHeroesContext(SummaryContext);
    const heroData: IQueryFunc<IHeroResponse | undefined> = useHeroesContext(HeroesContext);
    const favoriteHeroesData: IFavoriteHeroResponse = useHeroesContext(FavoriteHeroesContext);      
    const allCharactersCount: number = summaryData?.data?.totalHeroes ?? 0;
    const favoriteCount: number = favoriteHeroesData?.FavoriteHeroesCount ?? 0;
    const heroesCount: number = summaryData?.data?.heroCount ?? 0;
    const villainsCount: number = summaryData?.data?.villainCount ?? 0;
    const antiheroesCount: number = heroData?.data?.heroes?.filter(h => h.characterType.type === CharacterTypes.Anti_Hero).length ?? 0;
  
    return {summaryData, heroData, allCharactersCount, favoriteCount, heroesCount, villainsCount, antiheroesCount};
}
