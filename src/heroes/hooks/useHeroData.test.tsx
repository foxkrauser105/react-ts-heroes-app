import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { TestsSetup } from "../tests/testsHelper";
import { useHeroData } from "./useHeroData";
import { PaginationFactory } from "@/shared/utils/paginationUtils";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import type { IHeroResponse } from "../interfaces/IHeroResponse";
import { TabsTypes } from "../types/TabsTypes";

vi.mock('../actions/get-heroes-by-page.action', () => ({
    getHeroesByPageAction: vi.fn()
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);
const testsSetup: TestsSetup = new TestsSetup();

describe('useHeroData', () => {

    const pagination = PaginationFactory.CreatePaginationObject();
    beforeEach(() => {
        vi.clearAllMocks();
        testsSetup.ClearQueryClient();
    });

    test('should return the initial state (isLoading)', () => {
        
        const { result } = renderHook(() => useHeroData(pagination), { 
            wrapper: testsSetup.TanStackCustomProvider() 
        });

        expect(result.current).toBeDefined();
        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.error).toBeFalsy(); 
        expect(result.current.data).toBeUndefined();

    });

    test('should return success state with data when API call succeeds', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        } as IHeroResponse;

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => useHeroData(pagination), { 
            wrapper: testsSetup.TanStackCustomProvider() 
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(pagination);

    });

    test('should call getHeroesByPageAction with arguments', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        } as IHeroResponse;

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const newPagination = PaginationFactory.CreatePaginationObject('1', '6', TabsTypes.Heroes)

        const { result } = renderHook(() => useHeroData(newPagination), { 
            wrapper: testsSetup.TanStackCustomProvider() 
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(newPagination);

    });
});