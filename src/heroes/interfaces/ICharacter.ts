import type { ICharacterTypeProp } from "./ICharacterTypes";

interface ICharacterBase {
    id: string,
    image: string,
    slug: string,
    status: string,
    category: string
}

interface ICharacterFavoriteProps {
    isFavorite: boolean
}

//This interface was already created by me, just added ICharacterBase and ICharacterFavoriteProps to add missing props
//Also, changed the name of some props that were sligthly different.
export interface  ICharacter extends ICharacterBase, ICharacterFavoriteProps {
    alias: string,
    name: string,
    isActive: boolean,
    imgPath: string,
    universe: string,
    characterType: ICharacterTypeProp,
    team: string,
    description: string,
    strength: number,
    intelligence: number,
    speed: number,
    durability: number,
    powers: string[],
    firstAppearance: string
}