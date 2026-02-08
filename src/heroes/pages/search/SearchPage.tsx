import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { useSearchParams } from "react-router";
import type { ISearchHeroesOptions } from "@/heroes/interfaces/ISearchHeroesOptions";
import { URLParamKeysTypes } from "@/heroes/types/URLParamKeysTypes";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import type { ICharacter } from "@/heroes/interfaces/ICharacter";
import type { ResponseArgs } from "@/shared/api/models/responseArgs";

export const SearchPage = () => {

  const [searchParams] = useSearchParams();

  const searchOptions: ISearchHeroesOptions = {
    name: searchParams.get(URLParamKeysTypes.Name) ?? undefined,
    category: searchParams.get(URLParamKeysTypes.Category) ?? undefined,
    team: searchParams.get(URLParamKeysTypes.Team) ?? undefined,
    universe: searchParams.get(URLParamKeysTypes.Universe) ?? undefined,
    status: searchParams.get(URLParamKeysTypes.Status) ?? undefined,
    strength: searchParams.get(URLParamKeysTypes.Strength) ?? undefined
  };

  const { data: searchHeroData, isLoading } = useQuery<ResponseArgs>({
    queryKey: ['search-heroes', searchOptions],
    queryFn: () => searchHeroesAction(searchOptions),
    staleTime: 1000 * 60 * 5, //5 mins
  });

  return (
    <>
      <CustomJumbotron 
        title="Búsqueda de Superhéroes" 
        description="Descubre, explora, y administra super héroes y villanos" 
      />

      {/* Stats Dashboard */}
      <HeroStats />
    
      {/* Filter and Search */}
      <SearchControls />

      {/* Search Results */}
      { (isLoading && <div>Loading...</div>) }
      { (!isLoading && <HeroGrid characters={searchHeroData?.AdditionalObject as ICharacter[]} fromHomePage={false} infoMessage={searchHeroData?.Message} />) }
    </>
  )
}

export default SearchPage;
