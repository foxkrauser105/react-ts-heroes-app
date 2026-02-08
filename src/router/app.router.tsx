import { createHashRouter, Navigate, type RouteObject } from "react-router";

import { Paths } from "./app.routes.list";
import { ErrorPage } from "@/shared/components/ErrorPage";

const createRoutes = (): RouteObject[] => {
    
    const routes: RouteObject[] = 
    [{
        path: '*',
        element: <Navigate to='/' />
    }];

    const mainPaths = Paths?.filter(p => !p.parent);
    if (mainPaths?.length > 0){
    
        for (const mainPath of mainPaths){
            const children: RouteObject[] = 
                Paths.filter(p => p.parent === mainPath.path)
                        .map(p => ({ 
                                index: p.index, 
                                path: p.path, 
                                element: p.element
                            } as RouteObject
                        ));

            const route: RouteObject = {
                path: mainPath.path,
                element: mainPath.element,
                children: children,
                errorElement: <ErrorPage />
            }

            routes.push(route);
        }
    }

    return routes;
}

// export const appRouter = createBrowserRouter(createRoutes());
export const appRouter = createHashRouter(createRoutes());