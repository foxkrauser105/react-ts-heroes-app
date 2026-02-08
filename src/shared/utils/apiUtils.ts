import type { ISearchHeroesOptions } from '@/heroes/interfaces/ISearchHeroesOptions';
import { StringUtils } from './stringUtils';

export class ApiUtils {
    
    public static GetParamsFromSearchOptions (searchOptions: ISearchHeroesOptions): string {
        
        if(!searchOptions){
            return "";
        }

        let params: string = "";

        Object.entries(searchOptions).forEach(([key, value]) => {
            if (!StringUtils.StringIsNullEmptyOrWhiteSpace(value as string)) {
                
                if(!params) {
                    params += "?";
                }
                else {
                    params += "&";
                }

                params += `${key}=${value}`;
            }
        });

        return params;
    }
}