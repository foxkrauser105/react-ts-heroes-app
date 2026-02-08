import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchPage } from "./SearchPage";
import { MemoryRouter } from "react-router";
import { TestsSetup } from "@/heroes/tests/testsHelper";
import { HeroesProvider } from "@/heroes/provider/HeroesProvider";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { ISearchHeroesOptions } from '../../interfaces/ISearchHeroesOptions';
import { ApiUtils } from "@/shared/utils/apiUtils";
import { beforeEach } from "vitest";
import type { ICharacter } from '../../interfaces/ICharacter';
import { Characters } from "@/heroes/tests/charactersListMockData";
import { ResponseArgs } from "@/shared/api/models/responseArgs";
import { CharacterUtils } from "@/heroes/utils/characterUtils";

vi.mock("@/heroes/actions/search-heroes.action");
const mockSearcHeroesAction = vi.mocked(searchHeroesAction);

vi.mock("@/components/custom/CustomJumbotron", () => ({
    CustomJumbotron: () => <div data-testid="custom-jumbotron"></div>
}));

vi.mock("./ui/SearchControls", () => ({
    SearchControls: () => <div data-testid="search-controls"></div>
}));

vi.mock("@/heroes/components/HeroGrid", () => ({
    HeroGrid: ({characters}: {characters: ICharacter[]}) => (
    <div data-testid="hero-grid">
        {
            characters.map(h => (
                <div key={h.id}>{h.name}</div>
            ))
        }
    </div>)
}));

const testsSetup = new TestsSetup();

const TanstackCustomProvider = testsSetup.TanStackCustomProvider();

const renderSearchPage = (initialEntries?: string[]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries} >
            <TanstackCustomProvider>
                <HeroesProvider>
                    <SearchPage />
                </HeroesProvider>
            </TanstackCustomProvider>
        </MemoryRouter>
    );
}

beforeEach(() => {
    vi.clearAllMocks();
    testsSetup.ClearQueryClient();
});

describe('SearchPage', () => {
    test('should render SearchPage with default values', () => {
        
        const searchOptions: ISearchHeroesOptions = {
            name: undefined,
            category: undefined,
            team: undefined,
            universe: undefined,
            status: undefined,
            strength: undefined
        };
        
        const {container} = renderSearchPage();

        expect(mockSearcHeroesAction).toHaveBeenCalledWith(searchOptions);

        expect(container).toMatchSnapshot();
    });

    test('should call search action with name parameter', () => {
        
        const searchOptions: ISearchHeroesOptions = {
            name: "superman",
            category: undefined,
            team: undefined,
            universe: undefined,
            status: undefined,
            strength: undefined
        };

        const params = ApiUtils.GetParamsFromSearchOptions(searchOptions);
        
        const {container} = renderSearchPage([`/search${params}`]);

        expect(mockSearcHeroesAction).toHaveBeenCalledWith(searchOptions);

        expect(container).toMatchSnapshot();
    });

    test('should call search action with strength parameter', () => {
        
        const searchOptions: ISearchHeroesOptions = {
            name: undefined,
            category: undefined,
            team: undefined,
            universe: undefined,
            status: undefined,
            strength: "6"
        };

        const params = ApiUtils.GetParamsFromSearchOptions(searchOptions);
        
        const {container} = renderSearchPage([`/search${params}`]);

        expect(mockSearcHeroesAction).toHaveBeenCalledWith(searchOptions);

        expect(container).toMatchSnapshot();
    });

    test('should call search action with both name and strength parameters', () => {
        
        const searchOptions: ISearchHeroesOptions = {
            name: "batman",
            category: undefined,
            team: undefined,
            universe: undefined,
            status: undefined,
            strength: "8"
        };

        const params = ApiUtils.GetParamsFromSearchOptions(searchOptions);
        
        const {container} = renderSearchPage([`/search${params}`]);

        expect(mockSearcHeroesAction).toHaveBeenCalledWith(searchOptions);

        expect(container).toMatchSnapshot();
    });

    test('should render HeroGrid with search results', async() => {

        const characters = Characters()

        const response = new ResponseArgs(true);
        response.AdditionalObject = CharacterUtils.GetSearchHeroResponse(characters);

        mockSearcHeroesAction.mockResolvedValue(response);

        renderSearchPage();

        await waitFor(() => {
            for(let i = 0; i < characters.length; i++){
                expect(screen.getByText(characters[i].name));
            }
        })
    });
});