import type { ICharacter } from "./ICharacter";

export interface ISummaryResponse {
    totalHeroes: number,
    strongestHero: ICharacter,
    smartestHero: ICharacter,
    heroCount: number,
    villainCount: number
}