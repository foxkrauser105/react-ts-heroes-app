import { Link, useLocation } from 'react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { SlashIcon } from 'lucide-react';

import { PathUtils } from '@/shared/utils/pathUtils';
import type { IPathResult } from '@/shared/interfaces/IPath';

export const CustomBreadcrumbs = () => {

    const { pathname } = useLocation();
    const initialPath: string = '/';
    const pathArray: string[] = pathname.split('/').filter(s => s.trim().length > 0);
    const currentPathsAvailable: IPathResult[] = [];

    const GetPathsAvailable = () => {

        const homePath: IPathResult | null = PathUtils.GetPathResultByPathName(initialPath);

        if (homePath){
            currentPathsAvailable.push(homePath);
        }

        for (let i = 0; i < pathArray.length; i++) {

            const path: string = getPathByIndex(i);

            if (path){

                let queryParams: string[] = [];

                if (path.indexOf('/') !== -1){
                    queryParams = path.split('/').slice(1);
                }

                const pathObj: IPathResult | null = PathUtils.GetPathResultByPathName(path, queryParams);
                if (pathObj){                
                    currentPathsAvailable.push(pathObj);
                }
            }
        }
    }

    const getPathByIndex = (index: number): string => {
        const path: string = pathArray.slice(0, index + 1).join('/');
        return path;
    };

    GetPathsAvailable();

  return (
    <Breadcrumb>
    <BreadcrumbList>
        {
            currentPathsAvailable.length > 0
            && 
            (
                currentPathsAvailable.map((p, i) => {

                    const nodeCollection: React.ReactNode[] = [];

                    if (i > 0 && i < currentPathsAvailable.length) {
                        nodeCollection.push(
                            <BreadcrumbSeparator key={`separator-${i}`}>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                        );
                    }
                    
                    if (i < currentPathsAvailable.length - 1){

                        nodeCollection.push(
                            <BreadcrumbItem key={`breadcrumb-item-${i}`}>
                                <BreadcrumbLink asChild>
                                    <Link to={p.path}>{p.name}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        );
                    }
                    else{
                        
                        nodeCollection.push(
                            <BreadcrumbItem key={`breadcrumb-item-${i}`}>
                                <BreadcrumbPage>{p.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        nodeCollection
                    );
                })      
            ) 
        }

    </BreadcrumbList>
    </Breadcrumb>
  )
}
