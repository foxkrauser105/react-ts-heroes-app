import { Badge } from '@/components/ui/badge';
import { Heart, Trophy, Users, Zap } from 'lucide-react';
import { HeroStatCard } from './HeroStatCard';
import type { ICharacter } from '../interfaces/ICharacter';
import type { IHeroBasicData } from '../interfaces/IHeroBasicData';
import { GetHeroBasicData } from '../customHooks/getHeroBasicData';

export const HeroStats = () => {

    const {summaryData: {data: summaryData, isLoading}, allCharactersCount, favoriteCount, heroesCount, villainsCount, antiheroesCount}: IHeroBasicData = GetHeroBasicData();
    
    const favoritePercentage: number = (summaryData?.totalHeroes ?? 0) > 0 ? ((favoriteCount / (summaryData?.totalHeroes ?? 1)) * 100) : 0;
    const favoritePercentageFixed: string = favoritePercentage.toFixed(2);
    const strongest: ICharacter = summaryData?.strongestHero!;
    const smartest: ICharacter = summaryData?.smartestHero!;
    
  return (
    <>
    {((isLoading || !summaryData) && (<div>Loading...</div>))}
    {(!isLoading && summaryData && (<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                        <HeroStatCard 
                            title="Total de Personajes" 
                            icon={<Users className="h-4 w-4 text-muted-foreground" />} 
                        >
                            <div className="text-2xl font-bold">{allCharactersCount}</div>
                            <div className="flex gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">
                                {heroesCount} Heroe{heroesCount === 1 ? "" : "s" }
                            </Badge>
                            <Badge variant="destructive" className="text-xs">
                                {villainsCount} Villano{villainsCount === 1 ? "" : "s" }
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {antiheroesCount} Anti-Heroe{antiheroesCount === 1 ? "" : "s" }
                            </Badge>
                            </div>
                        </HeroStatCard>

                        <HeroStatCard 
                            title="Favoritos" 
                            icon={<Heart className="h-4 w-4 text-muted-foreground" />} 
                        >
                            <div className="text-2xl font-bold text-red-600" data-testid="favorite-count">
                                {favoriteCount}
                            </div>
                            <p className="text-xs text-muted-foreground" data-testid="favorite-percentage">
                                {favoritePercentageFixed}% del total
                            </p>
                        </HeroStatCard>
                        {(  
                            strongest && <HeroStatCard 
                                title="El más Fuerte" 
                                icon={<Zap className="h-4 w-4 text-muted-foreground" />} 
                            >
                                <div className="text-lg font-bold">{strongest.alias}</div>
                                <p className="text-xs text-muted-foreground">Fuerza: {strongest.strength}/10</p>
                            </HeroStatCard> )}
                        {(
                            smartest && <HeroStatCard 
                                title="El más Inteligente" 
                                icon={<Trophy className="h-4 w-4 text-muted-foreground" />} 
                            >
                                <div className="text-lg font-bold">{smartest.alias}</div>
                                <p className="text-xs text-muted-foreground">Inteligencia: {smartest.intelligence}/10</p>
                            </HeroStatCard>
                        )}
                    </div> 
                    )
    )}
    </>
)}
