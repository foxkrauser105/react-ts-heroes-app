import { ContextFactory } from "../../shared/utils/contextUtils";
import type { ISummaryResponse } from '../interfaces/ISummaryResponse';
import type { IQueryFunc } from "../interfaces/IQueryFunc";

export const SummaryContext = ContextFactory.CreateContext<IQueryFunc<ISummaryResponse | undefined>>("SummaryContext");