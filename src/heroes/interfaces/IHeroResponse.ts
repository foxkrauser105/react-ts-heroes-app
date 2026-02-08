import type { ICharacter } from "./ICharacter";

export interface IHeroResponse {
    total: number,
    pages: number,
    heroes: ICharacter[]
}