import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FavoriteHeroesProvider } from "../provider/FavoriteHeroesProvider";
import { FavoriteHeroesContext } from "./FavoriteHeroesContext";
import type { ICharacter } from "../interfaces/ICharacter";
import { HeroMiscConstants } from "../constants/HeroMiscConstants";

const mockHero = {
    id: '1',
    name: 'Batman'
} as ICharacter

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

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

describe('FavoriteHeroesContext2', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should initialize with default values', () => {

        renderContextTest();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorites when ToggleFavorite is called', () => {
        
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');

        fireEvent.click(button);

        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('hero-1').textContent).toBe(mockHero.name);
        
        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith(HeroMiscConstants.FavoriteHeroesLSK, JSON.stringify([mockHero]));
    });

    test('should remove hero from favorites when toggleFavorite is called and it was previously a favorite', () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));
        
        renderContextTest();

        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('hero-1').textContent).toBe(mockHero.name);

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.queryByTestId('hero-1')).toBeNull();

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith(HeroMiscConstants.FavoriteHeroesLSK, JSON.stringify([]));

        expect(localStorageMock.getItem).toHaveBeenCalled();
    });
});