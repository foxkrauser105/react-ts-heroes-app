import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { HeroesProvider } from "../provider/HeroesProvider";
import { TestsSetup } from "../tests/testsHelper";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { heroStatsMockData } from "../tests/heroStatsMockData";
import { LocalStorageUtils } from "@/shared/utils/localStorageUtils";
import { HeroMiscConstants } from "../constants/HeroMiscConstants";

vi.mock('../hooks/useHeroSummary');
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const testsSetup = new TestsSetup();

const TestQueryClientProvider = testsSetup.TanStackCustomProvider();

const renderHeroStats = (mockData?: Partial<typeof useHeroSummary>) => {

    mockUseHeroSummary.mockReturnValue({
        data: mockData ? mockData : undefined
    } as unknown as ReturnType<typeof useHeroSummary>);

    return render(
        <>
            <TestQueryClientProvider>
                <MemoryRouter initialEntries={ ['/'] } >
                    <HeroesProvider >
                        <HeroStats />
                    </HeroesProvider>
                </MemoryRouter>
            </TestQueryClientProvider>
        </>
    )
}

describe('HeroStats', () => {

    test('should render component with default values', () => {
        
        const { container } = renderHeroStats();

        expect(screen.getByText('Loading...')).toBeDefined();
        expect(container).toMatchSnapshot();
    });

    test('should render HeroStats with mock information', () => {
        const { container } = renderHeroStats(heroStatsMockData);

        expect(container).toMatchSnapshot();
        expect(screen.getByText('Total de Personajes')).toBeDefined();
        expect(screen.getByText('Favoritos')).toBeDefined();
        expect(screen.getByText('El más Fuerte')).toBeDefined();
    });

    test('should change the percentage of favorites when a hero is added to favorites', () => {
        LocalStorageUtils.SetDataToLocalStorage(HeroMiscConstants.FavoriteHeroesLSK, [heroStatsMockData.strongestHero]);

        renderHeroStats(heroStatsMockData);

        const favoritePercentageElement = screen.getByTestId('favorite-percentage');
        expect(favoritePercentageElement.innerHTML).toContain('4.00%');

        const favoriteCountElement = screen.getByTestId('favorite-count');
        expect(favoriteCountElement.innerHTML).toContain('1');
    });

});