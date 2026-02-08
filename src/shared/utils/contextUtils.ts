import { createContext } from "react";

export class ContextFactory {

    public static CreateContext<T>(displayName: string, value?: T) {

        if (!displayName || displayName.trim().length === 0){
            throw new Error(
              `You must provide a displayName to create a new Context.`
            );
        }

        const context = createContext<T>(value ? value : null!);
        context.displayName = displayName;
        return context;
    }

}