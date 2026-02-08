import { describe, expect, test } from "vitest";
import { GetCharacterTypeByCategory } from "../enums/CharacterTypeEnum";
import type { ICharacter } from "../interfaces/ICharacter";
import { heroApi } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;


describe('getHeroAction', () => {
    test('should fetch hero data and return it with complete image url', async () => {    
        
        const idSlug: string = 'clark-kent';
        const image = '1.jpeg';

        let { data } = await heroApi.get<ICharacter>(`/${idSlug}`);
        
        data = {
            ...data,
            imgPath: `${ BASE_URL }/images/${ data.image }`,
            isActive: data.status === 'Active',
            characterType: GetCharacterTypeByCategory(data.category)
        };

        expect(data).toBeDefined();
        expect(data.id).toBe('1');
        expect(data.imgPath).toBe(`${ BASE_URL }/images/${ image }`);
        expect(data.isActive).toBe(true);
        expect(data.characterType).toEqual(GetCharacterTypeByCategory(data.category));
    });

    test('should throw an error if hero not found', async () => {
        const idSlug: string = 'unknown-hero';
        const result = await heroApi.get<ICharacter>(`/${idSlug}`).catch ((error) => {
            expect(error).toBeDefined();
            expect(error.status).toBe(404);
            expect(error.response.data.message).toBe('Hero not found');
        });

        expect(result).toBeUndefined();
    });
});