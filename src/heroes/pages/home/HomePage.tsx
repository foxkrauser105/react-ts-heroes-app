import { useSearchParams } from "react-router";

import {
  Heart,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"

import { TabsTypes, type TabsType } from "@/heroes/types/TabsTypes"
import { CustomPagination } from "@/components/custom/CustomPagination"
import type { IHeroBasicData } from "@/heroes/interfaces/IHeroBasicData";
import { GetHeroBasicData } from "@/heroes/customHooks/getHeroBasicData";
import { useHeroesContext } from "@/heroes/customHooks/useHeroesContext";
import { PaginationContext } from "@/heroes/context/PaginationContext";
import { PaginationFactory } from "@/shared/utils/paginationUtils";
import type { IPagination } from "@/heroes/interfaces/IPagination";
import { URLParamKeysTypes } from "@/heroes/types/URLParamKeysTypes";

export const HomePage = () => {

  const {heroData: {data: heroData, isLoading}, allCharactersCount, favoriteCount, heroesCount, villainsCount, antiheroesCount}: IHeroBasicData = GetHeroBasicData();

  //const test: string = useHeroesContext(TestContext)

  const totalPages = (heroData?.pages ?? 1)
  const [, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = useHeroesContext(PaginationContext);

  const SetSelectedTab = (tab: TabsType) => {

    const newPage: string = "1";
    const newPagination: IPagination = PaginationFactory.CreatePaginationObject(newPage, pagination.limit.toString(), tab);

    setPagination(newPagination);

    setSearchParams((prev) => {
      prev.set(URLParamKeysTypes.Tab, tab);
      prev.set(URLParamKeysTypes.Page, newPage);
      return prev;
    });
  }
  
  return (
    <>
      <>
      {( isLoading && <div>Loading</div>)}
      {( heroData?.heroes && 
          (<>
          {/* Header */}
          <CustomJumbotron title="Universo de Superhéroes" description="Descubre, explora, y administra super héroes y villanos" />
          
          {/* Stats Dashboard */}
          <HeroStats />

          {/* Tabs */}
          <Tabs value={pagination.category} className="mb-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value={TabsTypes.All}
                          onClick={ () => {
                            const tab = TabsTypes.All;
                            SetSelectedTab(tab);
                          }}>
                All Characters ({allCharactersCount})
              </TabsTrigger>
              <TabsTrigger value={TabsTypes.Favorites}
                          className="flex items-center gap-2"
                          onClick={ () => {
                            const tab = TabsTypes.Favorites;
                            SetSelectedTab(tab);
                          }}>
                <Heart className="h-4 w-4" />
                Favorites ({favoriteCount})
              </TabsTrigger>
              <TabsTrigger value={TabsTypes.Heroes}
                          onClick={ () => {
                            const tab = TabsTypes.Heroes;
                            SetSelectedTab(tab);
                          }}>
                Heroes ({heroesCount})
              </TabsTrigger>
              <TabsTrigger value={TabsTypes.Villains}
                          onClick={ () => {
                            const tab = TabsTypes.Villains;
                            SetSelectedTab(tab);
                          }}>
                Villains ({villainsCount})
              </TabsTrigger>
              <TabsTrigger value={TabsTypes.Anti_Heroes}
                          onClick={ () => {
                            const tab = TabsTypes.Anti_Heroes;
                            SetSelectedTab(tab);
                          }}>
                Anti-Heroes ({antiheroesCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={pagination.category}>
              { /* Filtro por tab activo */}
              <HeroGrid />
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <CustomPagination totalPages={totalPages}/>
        </>)
      )}
      </>
    </>
  )
}

export default HomePage;
