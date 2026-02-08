import { PaginationTranslation } from "@/shared/utils/paginationUtils";
import { heroApi } from "../api/hero.api"
import type { IHeroResponse } from "../interfaces/IHeroResponse";
import { type IPagination } from '../interfaces/IPagination';
import { CharacterUtils } from "../utils/characterUtils";

export const getHeroesByPageAction = async(pagination: IPagination): Promise<IHeroResponse> => {
    const { data } = await heroApi.get<IHeroResponse>(`/`, {
        params: {
            limit: pagination.limit,
            offset: (pagination.page - 1) * (pagination.limit),
            category: PaginationTranslation.GetCategoryByTabSelected(pagination.category)
        }
    });

    return CharacterUtils.GetHeroResponse(data);
}