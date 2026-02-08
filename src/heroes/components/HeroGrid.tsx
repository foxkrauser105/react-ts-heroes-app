import type { IHeroGridProps } from "../interfaces/IHeroGridProps"
import { HeroGridCard } from "./HeroGridCard"

export const HeroGrid = ({characters = undefined, fromHomePage = true, infoMessage = ""}: IHeroGridProps) => {

  return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <HeroGridCard characters={characters} fromHomePage={fromHomePage} infoMessage={infoMessage} />
        </div>
  )
}
