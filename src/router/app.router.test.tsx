import { render, screen } from "@testing-library/react";
import { Outlet, RouterProvider, useParams } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { appRouter } from './app.router';
import { RouterTestsSetup } from "./tests/routerTestSetup";

vi.mock("@/heroes/layouts/HeroesLayout", () => ({
    HeroesLayout: () => <div data-testid="heroes-layout">
        <Outlet />
    </div>
}));

vi.mock("@/heroes/pages/home/HomePage", () => ({
    HomePage: () => <div data-testid="home-page">Home Page</div>
}));

vi.mock("@/heroes/pages/hero/HeroPage", () => ({
    HeroPage: () => {

        const { idSlug = ''} = useParams();

        return (
            <div data-testid="hero-page">HeroPage - {idSlug}</div>
        )
    }
}));

vi.mock("@/heroes/pages/search/SearchPage", () => ({

    default: () => <div data-testid="search-page"></div>

}));

const routerTestSetup: RouterTestsSetup = new RouterTestsSetup();

beforeEach(() => {
    routerTestSetup.ResetEntries(['/']);
})

describe('appRouter', () => {
    test('should be configured as expected', () => {
        expect(appRouter.routes).toMatchSnapshot();
    });

    test('should render Home Page at root path', () => {
        const router = routerTestSetup.GetRouter();

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('should render hero page at /heroes/:idSlug path', () => {
        
        const route = 'heroes',
              idSlug = 'superman';

        routerTestSetup.ResetEntries([`/${route}/${idSlug}`]);
        const router = routerTestSetup.GetRouter();

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('hero-page').innerHTML).toContain(idSlug);
    });

    test('should render search page at /search path', async () => {

        const route = 'search';

        routerTestSetup.ResetEntries([`/${route}`]);
        const router = routerTestSetup.GetRouter();

        render(<RouterProvider router={router} />);

        expect(await screen.findByTestId('search-page')).toBeDefined();
    });

    test('should redirect to home page for unknown routes', async () => {

        const route = 'hdwuaihdwaihd';

        routerTestSetup.ResetEntries([`/${route}`]);
        const router = routerTestSetup.GetRouter();

        render(<RouterProvider router={router} />);

        screen.debug();
        expect(await screen.findByTestId('home-page')).toBeDefined();
    });
});