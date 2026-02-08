import { type ICharacterTypeEnum, type ICharacterTypeProp } from "../interfaces/ICharacterTypes";
import { CharacterTypes } from "../types/CharacterTypes";

export const CharacterTypeEnum: ICharacterTypeEnum = Object.freeze ({
    Villain: { type: CharacterTypes.Villain, class: "bg-red-100 text-red-800 border-red-200" },
    Hero: { type: CharacterTypes.Hero, class: "bg-green-100 text-green-800 border-green-200" },
    Anti_Hero: { type: CharacterTypes.Anti_Hero, class: "bg-yellow-100 text-yellow-800 border-yellow-200" }
});

export const GetCharacterTypeByCategory = (category: string): ICharacterTypeProp => {
    switch(category){
        case "Villain":
            return CharacterTypeEnum.Villain;
        case "Anti-Hero":
            return CharacterTypeEnum.Anti_Hero;
        default:
            return CharacterTypeEnum.Hero;
    }
}