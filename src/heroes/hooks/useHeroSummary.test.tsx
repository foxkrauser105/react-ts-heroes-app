import { beforeEach, describe, expect, test, vi } from "vitest";
import { useHeroSummary } from "./useHeroSummary";
import { renderHook, waitFor } from "@testing-library/react";
import { getSummary } from "../actions/get-summary.action";
import type { ISummaryResponse } from "../interfaces/ISummaryResponse";
import { TestsSetup } from "../tests/testsHelper";

vi.mock('../actions/get-summary.action', () => ({
    getSummary: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummary);

const testsSetup: TestsSetup = new TestsSetup();

describe('useHeroSummary', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        testsSetup.ClearQueryClient();
    });

    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => useHeroSummary(), { 
            wrapper: testsSetup.TanStackCustomProvider() 
        });

        expect(result.current).toBeDefined();
        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.error).not.toBeTruthy(); 
        expect(result.current.data).toBeUndefined();
    });

    test('should return success state with data when API call succeed', async () => {

        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Superman'
            },
            smartestHero: {
                id: '2',
                name: 'Batman'
            },
            heroCount: 18,
            villainCount: 7
        } as ISummaryResponse;

        mockGetSummaryAction.mockResolvedValue(mockSummaryData);

        const { result } = renderHook(() => useHeroSummary(), { 
            wrapper: testsSetup.TanStackCustomProvider() 
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGetSummaryAction).toHaveBeenCalled();
        expect(result.current.data).toBeDefined();
        expect(result.current.data).toStrictEqual(mockSummaryData);
        expect(result.current.error).toBeFalsy();
    });

    test('should return error state when API call fails', async () => {

        const mockError = new Error('Failed to fetch summary data');
        mockGetSummaryAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useHeroSummary(), { 
            wrapper: testsSetup.TanStackCustomProvider() 
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        expect(mockGetSummaryAction).toHaveBeenCalled();
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBeDefined();
        expect(result.current.error).toStrictEqual(mockError);
    });
});