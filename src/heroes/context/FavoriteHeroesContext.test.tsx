import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FavoriteHeroesProvider } from "../provider/FavoriteHeroesProvider";
import { FavoriteHeroesContext } from "./FavoriteHeroesContext";
import type { ICharacter } from "../interfaces/ICharacter";
import { HeroMiscConstants } from "../constants/HeroMiscConstants";
import { LocalStorageUtils } from "@/shared/utils/localStorageUtils";
import type { IFavoriteHero } from "../interfaces/IFavoriteHeroResponse";
import { beforeEach } from "vitest";

const mockHero = {
    id: '1',
    name: 'Batman'
} as ICharacter

const TestComponent = () => {
    
    const {FavoriteHeroesCount, FavoriteHeroes, IsFavorite, ToggleFavorite} = use(FavoriteHeroesContext);
    
    return (
        <div>
            <div data-testid="favorite-count">
                {FavoriteHeroesCount}
            </div>
            <div data-testid="favorite-list">
                {
                    FavoriteHeroes.map((h) => (
                        <div key={h.id} data-testid={`hero-${h.id}`}>
                            {h.name}
                        </div>
                    ))
                }
            </div>

            <button 
                data-testid="toggle-favorite"
                onClick={() => ToggleFavorite(mockHero)}>
                Toggle Favorite
            </button>
            <div data-testid="is-favorite">
                {IsFavorite(mockHero).toString()}
            </div>
        </div>
    )
}

const renderContextTest = () => {
    return render(
        <FavoriteHeroesProvider>
            <TestComponent />
        </FavoriteHeroesProvider>
    )
}

describe('FavoriteHeroesContext', () => {

    beforeEach(() => {
        localStorage.clear();
    })

    test('should initialize with default values', () => {

        renderContextTest();

        screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorites when ToggleFavorite is called', () => {
        
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');

        fireEvent.click(button);

        screen.debug();

        const favoriteLocalStorage = LocalStorageUtils.GetDataFromLocalStorage<IFavoriteHero[]>(HeroMiscConstants.FavoriteHeroesLSK);

        console.log(favoriteLocalStorage);

        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('hero-1').textContent).toBe(mockHero.name);
        expect(favoriteLocalStorage.length).toBe(1);
        expect(favoriteLocalStorage[0]).toStrictEqual(mockHero);
    });

    test('should remove hero from favorites when toggleFavorite is called and it was previously a favorite', () => {
        
        localStorage.clear();
        LocalStorageUtils.SetDataToLocalStorage(HeroMiscConstants.FavoriteHeroesLSK, [mockHero]);
        
        renderContextTest();

        screen.debug();

        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('hero-1').textContent).toBe(mockHero.name);

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.queryByTestId('hero-1')).toBeNull();
    });
});