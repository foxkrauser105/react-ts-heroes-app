import type { IPagination } from "../interfaces/IPagination";
import { ContextFactory } from "../../shared/utils/contextUtils";

export const PaginationContext = ContextFactory.CreateContext<[IPagination, React.Dispatch<React.SetStateAction<IPagination>>]>("PaginationContext");