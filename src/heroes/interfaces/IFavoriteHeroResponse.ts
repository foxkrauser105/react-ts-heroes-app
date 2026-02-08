import type { ICharacter } from "./ICharacter";

export interface IFavoriteHero extends ICharacter {}

export interface IFavoriteHeroResponse {
    FavoriteHeroes: IFavoriteHero[],
    FavoriteHeroesCount: number,

    IsFavorite: (character: ICharacter) => boolean,
    ToggleFavorite: (character: IFavoriteHero) => void;
}
