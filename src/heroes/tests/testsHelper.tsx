
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { JSX, PropsWithChildren } from "react";
import { Tests } from "./testsSetup";

export class TestsSetup {
    
    private _queryClient: QueryClient;

    constructor() {
        this._queryClient = Tests.TanStackQueryClientProvider();
    }

    public TanStackCustomProvider(): ({children}: PropsWithChildren) => JSX.Element {
        return ({children}: PropsWithChildren) => (<QueryClientProvider client={this._queryClient}>{ children }</QueryClientProvider>);
    };

    public ClearQueryClient(): void {
        this._queryClient.clear();
    }
}