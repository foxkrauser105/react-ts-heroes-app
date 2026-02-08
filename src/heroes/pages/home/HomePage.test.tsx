import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router";
import { HeroesProvider } from "@/heroes/provider/HeroesProvider";
import { TestsSetup } from "@/heroes/tests/testsHelper";
import { useHeroData } from "@/heroes/hooks/useHeroData";
import { Characters } from "@/heroes/tests/charactersListMockData";
import { PaginationFactory } from "@/shared/utils/paginationUtils";
import { CharacterTypes } from "@/heroes/types/CharacterTypes";
import { TabsTypes } from "@/heroes/types/TabsTypes";

vi.mock("@/heroes/hooks/useHeroData");

const mockUseHeroData = vi.mocked(useHeroData);
const useHeroMockData = Characters();

mockUseHeroData.mockReturnValue({
    data: {
        heroes: useHeroMockData,
        total: useHeroMockData.length,
        pages: 1
    },
    isLoading: false,
    isError: false,
    isSuccess: false
} as unknown as ReturnType<typeof useHeroData>);

//Preparing component to be mounted, as it has a dependency from UseParams
const testSetup: TestsSetup = new TestsSetup();
const renderHomePage = (initialEntries?: string[]) => {

    const TanStackCustomProvider = testSetup.TanStackCustomProvider();

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <TanStackCustomProvider>
                <HeroesProvider>
                    <HomePage />
                </HeroesProvider>
            </TanStackCustomProvider>
        </MemoryRouter>
    )
}

beforeEach(() => {
    vi.clearAllMocks();
})

describe('HomePage', () => {
    test('should render home page with default values', () => {
        const { container } = renderHomePage();

        expect(container).toMatchSnapshot();
    });

    test('should call useHeroData with default values', () => {

        const pagination = PaginationFactory.CreatePaginationObject();
        renderHomePage();

        expect(mockUseHeroData).toHaveBeenCalledWith(pagination);

    });

    test('should call useHeroData with custom query params', () => {

        const pagination = PaginationFactory.CreatePaginationObject('2', '10', CharacterTypes.Villain.toLowerCase());
        
        renderHomePage([`/?page=${pagination.page}&limit=${pagination.limit}&category=${pagination.category}`]);

        expect(mockUseHeroData).toHaveBeenCalledWith(pagination);

    });

    test('should call useHeroData with favorites', () => {

        const pagination = PaginationFactory.CreatePaginationObject('2', '10', 'favorite');
        
        renderHomePage([`/?page=${pagination.page}&limit=${pagination.limit}&category=${pagination.category}`]);

        expect(mockUseHeroData).toHaveBeenCalledWith(pagination);

    });

    test('should call useHeroData with favorites', () => {

        const pagination = PaginationFactory.CreatePaginationObject('2', '10', 'favorite');
        
        renderHomePage([`/?page=${pagination.page}&limit=${pagination.limit}&category=${pagination.category}`]);

        const [ , , , villainsTab] = screen.getAllByRole('tab');

        fireEvent.click(villainsTab);

        pagination.page = 1;
        pagination.category = TabsTypes.Villains;
        expect(mockUseHeroData).toHaveBeenCalledWith(pagination);

    });
});