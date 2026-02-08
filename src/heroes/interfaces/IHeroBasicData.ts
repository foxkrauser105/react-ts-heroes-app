import type { IHeroResponse } from "./IHeroResponse";
import type { IQueryFunc } from "./IQueryFunc";
import type { ISummaryResponse } from "./ISummaryResponse";

export interface IHeroBasicData {
    summaryData: IQueryFunc<ISummaryResponse | undefined>;
    heroData: IQueryFunc<IHeroResponse | undefined>;
    allCharactersCount: number;
    favoriteCount: number;
    heroesCount: number;
    villainsCount: number;
    antiheroesCount: number;
}