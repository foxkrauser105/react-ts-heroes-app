import type { ICharacter } from "./ICharacter";

export interface IHeroGridProps {
    characters?: ICharacter[] | undefined,
    fromHomePage?: boolean,
    infoMessage?: string
}