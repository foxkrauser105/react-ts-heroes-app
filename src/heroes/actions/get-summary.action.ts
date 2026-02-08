import { heroApi } from "../api/hero.api"
import type { ISummaryResponse } from "../interfaces/ISummaryResponse";

export const getSummary = async() => {
    const { data } = await heroApi.get<ISummaryResponse>('/summary');

    return data;
}