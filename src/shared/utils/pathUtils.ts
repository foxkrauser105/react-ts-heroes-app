import type { IPath, IPathResult } from '../interfaces/IPath';
import { Paths } from '@/router/app.routes.list';

export class PathUtils {

    public static GetPathResultByPathName(path: string, queryParams?: string[]): IPathResult | null {
        
        for (const pathObj of Paths){       
            const newPath = PathUtils.ReplaceQueryParams(pathObj, queryParams);
            if (newPath === path){
                return {
                    path: newPath,
                    name: pathObj.name
                } as IPathResult
            }
        }

        return null;
    }

    public static ReplaceQueryParams(path: IPath, queryParams?: string[]): string {
        
        if (!queryParams || queryParams.length === 0){
            return path.path;
        }

        let newPath = path.path;

        for (let i = 0; i < queryParams.length; i++){

            const queryParamToReplace: string | undefined = path.queryParams?.find(qp => qp.key === `${i}`)?.value;

            if (queryParamToReplace){
                newPath = newPath.replace(queryParamToReplace, queryParams[i]);
            }
        }

        return newPath;
    }
}