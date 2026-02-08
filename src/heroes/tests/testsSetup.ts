import { QueryClient } from "@tanstack/react-query";

export class Tests {
    
    public static TanStackQueryClientProvider(): QueryClient {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
    }
}