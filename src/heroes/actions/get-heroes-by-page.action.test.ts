import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";
import { PaginationFactory } from "@/shared/utils/paginationUtils";
import { heroApi } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeroesByPageAction', () => {

    const heroesApiMock = new AxiosMockAdapter(heroApi);

    beforeEach(() => {
        heroesApiMock.reset();
    });

    test('should return default heroes', async () => {
        
        const pagination = PaginationFactory.CreatePaginationObject();

        const mockResponse = {
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: `1.jpeg`,
                },
                {
                    image: `2.jpeg`,
                }
            ]
        };

        heroesApiMock.onGet('/').reply(200, mockResponse);

        const response = await getHeroesByPageAction(pagination);

        expect(response).toBeDefined();
        expect(response).toStrictEqual({
            total: 10,
            pages: 2,
            heroes: [
                {
                    characterType: {
                        class: "bg-green-100 text-green-800 border-green-200",
                        type: "Hero",
                    },
                    image: `1.jpeg`,
                    imgPath: `${ BASE_URL }/images/1.jpeg`,
                    isActive: false,
                },
                {
                    characterType: {
                        class: "bg-green-100 text-green-800 border-green-200",
                        type: "Hero",
                    },
                    image: `2.jpeg`,
                    imgPath: `${ BASE_URL }/images/2.jpeg`,
                    isActive: false,
                }
            ]
        });
    });

    test('should return the correct heroes when page is not a number', async () => {
        
        const pagination = PaginationFactory.CreatePaginationObject(NaN as unknown as string, '5', 'heroes');

        const mockResponse = {
            total: 10,
            pages: 1,
            heroes: []
        };

        heroesApiMock.onGet('/').reply(200, mockResponse);

        const response = await getHeroesByPageAction(pagination);

        expect(response).toBeDefined();
        expect(response).toStrictEqual({
            total: 10,
            pages: 1,
            heroes: []
        });
    });

    test('should call the api with corect params', async () => {
        
        const pagination = PaginationFactory.CreatePaginationObject('2', '5', 'heroes');
        const mockResponse = {
            pages: 1,
            heroes: []
        };    

        heroesApiMock.onGet('/').reply(200, mockResponse);

        await getHeroesByPageAction(pagination);
        const params = heroesApiMock.history.get[0].params;

        expect(params).toStrictEqual({
            offset: 5,
            limit: 5,
            category: 'hero'
        });

    });    
});