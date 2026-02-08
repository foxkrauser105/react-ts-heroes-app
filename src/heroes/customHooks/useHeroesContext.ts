import { useContext, type Context } from "react";

export function useHeroesContext<T>(context: Context<T>) {
  const customContext = useContext(context);

  if (customContext == null) {
    throw new Error(
      `${context.displayName} must be inside HeroesProvider`
    );
  }

  return customContext;
}