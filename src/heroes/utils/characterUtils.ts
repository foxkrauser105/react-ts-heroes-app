import { GetCharacterTypeByCategory } from "../enums/CharacterTypeEnum";
import type { ICharacter } from "../interfaces/ICharacter";
import type { IHeroResponse } from "../interfaces/IHeroResponse";

const BASE_URL = import.meta.env.VITE_API_URL;

export class CharacterUtils {

    public static GetHeroResponse(data: IHeroResponse): IHeroResponse {
        
        const heroes = this.SetCharactersExtraInfo(data.heroes);    

        return {
            ...data,
            heroes: heroes
        }; 
    }
    
    public static GetSearchHeroResponse(data: ICharacter[]): ICharacter[] {
        return this.SetCharactersExtraInfo(data);
    }

    private static SetCharactersExtraInfo(characters: ICharacter[]): ICharacter[] {
        return characters.map(hero => ({
            ...hero,
            imgPath: `${ BASE_URL }/images/${ hero.image }`,
            isActive: hero.status === 'Active',
            characterType: GetCharacterTypeByCategory(hero.category)
        }));
    }
}