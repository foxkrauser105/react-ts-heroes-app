import { lazy } from 'react';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HomePage } from '@/heroes/pages/home/HomePage';
import type { IPath } from '@/shared/interfaces/IPath';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';

const LazySearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
const LazyAdminChild = lazy(() => import('@/admin/layouts/AdminLayout'));
const LazyAdmin = lazy(() => import('@/admin/pages/AdminPage'));

export const Paths: IPath[] = [
    {
        path: "/",
        name: "Inicio",
        element: <HeroesLayout />,
        index: false
    },
    {
        path: "/",
        name: "Inicio",
        element: <HomePage />,
        index: true,
        parent: '/'
    },
    {
        path: "search",
        name: "Buscar Personajes",
        element: <LazySearchPage />,
        index: false,
        parent: '/'
    },
    {
        path: "heroes/:idSlug",
        name: "Detalles del Personaje",
        element: <HeroPage />,
        index: false,
        parent: '/',
        queryParams: [{ key: "0", value: ":idSlug"}]
    },
    {
        path: 'admin',
        name: 'Admin',
        element: <LazyAdminChild />,
        index: false
    },
    {
        path: 'admin',
        name: 'Admin',
        element: <LazyAdmin />,
        index: true,
        parent: '/admin'
    }
]