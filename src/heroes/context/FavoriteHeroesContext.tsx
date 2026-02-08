import { ContextFactory } from "@/shared/utils/contextUtils";
import type { IFavoriteHeroResponse } from "../interfaces/IFavoriteHeroResponse";

export const FavoriteHeroesContext = ContextFactory.CreateContext<IFavoriteHeroResponse>("FavoriteHeroesContext");