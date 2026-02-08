import { MemoryRouter } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { HeroesProvider } from "@/heroes/provider/HeroesProvider";
import { TestsSetup } from "@/heroes/tests/testsHelper";
import type { PropsWithChildren } from 'react';

vi.mock('../ui/button', () => ({
    Button: ({children, ...props}: PropsWithChildren) => (
        <button {...props} >{children}</button>
    )
}));

//Preparing component to be mounted, as it has a dependency from UseParams
const testSetup: TestsSetup = new TestsSetup();
const renderWithRouter = (component: React.ReactElement, initialEntries?: string[]) => {

    const TanStackCustomProvider = testSetup.TanStackCustomProvider();

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <TanStackCustomProvider>
                <HeroesProvider>
                    {component}
                </HeroesProvider>
            </TanStackCustomProvider>
        </MemoryRouter>
    )
}

describe('CustomPagination', () => {

    test('should render component with default values', () => {
        const totalPages: number = 5;

        renderWithRouter(<CustomPagination totalPages={totalPages}/>);

        expect(screen.getByText('Anterior')).toBeDefined();
        expect(screen.getByText('Siguiente')).toBeDefined();

        for (let i = 1; i <= totalPages; i++) {
            expect(screen.getByText(`${i}`)).toBeDefined();
        }
    });

    test('should disable previous button when page is 1', () => {
        const totalPages: number = 5;

        renderWithRouter(<CustomPagination totalPages={totalPages}/>);
        
        const prevButton = screen.getByText('Anterior');

        expect(prevButton.getAttributeNames()).toContain('disabled');
    });

    test('should disable next button when page equals totalPages', () => {
        const totalPages: number = 5;

        renderWithRouter(<CustomPagination totalPages={totalPages}/>, [`/?page=${totalPages}`]);
        
        const nextButton = screen.getByText('Siguiente');

        expect(nextButton.getAttributeNames()).toContain('disabled');
    });

    test('should disable button from current page', () => {
        const currentPage: number = 5,
              totalPages: number = 6;

        renderWithRouter(<CustomPagination totalPages={totalPages}/>, [`/?page=${currentPage}`]);
        
        const prevPageButton = screen.getByText(`${currentPage - 1}`);
        const currentPageButton = screen.getByText(`${currentPage}`);

        expect(currentPageButton.getAttributeNames()).toContain('variant');
        expect(prevPageButton.getAttribute('variant')).toBe('outline');
        expect(currentPageButton.getAttribute('variant')).toBe('default');
    });

    test('should change page when button is clicked', () => {
        const currentPage: number = 3,
              totalPages: number = 6;

        renderWithRouter(<CustomPagination totalPages={totalPages}/>, [`/?page=${currentPage}`]);
        
        const prevPageButton = screen.getByText(`${currentPage - 1}`);
        const currentPageButton = screen.getByText(`${currentPage}`);

        screen.debug(currentPageButton);
        expect(prevPageButton.getAttribute('variant')).toBe('outline');
        expect(currentPageButton.getAttribute('variant')).toBe('default');

        fireEvent.click(prevPageButton);

        screen.debug(currentPageButton);
        expect(prevPageButton.getAttribute('variant')).toBe('default');
        expect(currentPageButton.getAttribute('variant')).toBe('outline');

    });
})