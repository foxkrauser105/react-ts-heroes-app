import type { ICharacter } from "./ICharacter";

export interface IFavoriteAction {
    type: string,
    payload: string,
    heroes?: ICharacter[]
}