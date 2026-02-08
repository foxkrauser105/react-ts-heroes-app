import type { ISearchHeroesOptions } from "../interfaces/ISearchHeroesOptions";
import { heroApi } from "../api/hero.api";
import type { ICharacter } from "../interfaces/ICharacter";
import { CharacterUtils } from "../utils/characterUtils";
import { ResponseArgs } from "@/shared/api/models/responseArgs";
import { ApiUtils } from "@/shared/utils/apiUtils";

export const searchHeroesAction = async (searchOptions?: ISearchHeroesOptions): Promise<ResponseArgs> => {

    let response: ResponseArgs = new ResponseArgs(true);

    if (searchOptions) {

        const params = ApiUtils.GetParamsFromSearchOptions(searchOptions);

        if (params) {
            const data = (await heroApi.get<ICharacter[]>(`/search${params}`)).data;
            response.AdditionalObject = CharacterUtils.GetSearchHeroResponse(data);

            return response;
        }
    }

    response.Success = false;
    response.Message = "No search parameters provided.";

    return response;
}
