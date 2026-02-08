import type { CharacterType } from "../types/CharacterTypes"

export interface ICharacterTypeProp {
    type: CharacterType,
    class: string
};

export interface ICharacterTypeEnum {
    Villain: ICharacterTypeProp,
    Hero: ICharacterTypeProp,
    Anti_Hero: ICharacterTypeProp
};