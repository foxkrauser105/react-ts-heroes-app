import { createMemoryRouter } from "react-router";
import { appRouter } from '../app.router';

type Router = ReturnType<typeof createMemoryRouter>;

export class RouterTestsSetup {
    private _memoryRouter: Router;

    constructor(initialEntries?: string[]) {
        this._memoryRouter = createMemoryRouter(appRouter.routes, {
            initialEntries: initialEntries ?? ['/']
        });
    }

    public GetRouter(): Router {
        return this._memoryRouter;
    }

    public ResetEntries(entries: string[]): void {
        this._memoryRouter = createMemoryRouter(appRouter.routes, {
            initialEntries: entries
        });
    }
}