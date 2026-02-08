import type { IQueryFunc } from "../interfaces/IQueryFunc";
import type { IHeroResponse } from "../interfaces/IHeroResponse";
import { ContextFactory } from "../../shared/utils/contextUtils";

export const HeroesContext = ContextFactory.CreateContext<IQueryFunc<IHeroResponse | undefined>>("HeroesContext");