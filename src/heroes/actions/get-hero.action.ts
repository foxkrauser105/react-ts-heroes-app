import { heroApi } from "../api/hero.api";
import { GetCharacterTypeByCategory } from "../enums/CharacterTypeEnum";
import type { ICharacter } from "../interfaces/ICharacter";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHero = async(idSlug: string) => {
    const { data } = await heroApi.get<ICharacter>(`/${idSlug}`);

    return {
        ...data,
        imgPath: `${ BASE_URL }/images/${ data.image }`,
        isActive: data.status === 'Active',
        characterType: GetCharacterTypeByCategory(data.category)
    }
}