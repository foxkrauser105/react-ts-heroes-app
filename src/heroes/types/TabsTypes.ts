export const TabsTypes = {
    All: "all",
    Favorites: "favorites",
    Heroes: "heroes",
    Villains: "villains",
    Anti_Heroes: "anti-heroes",
} as const;

export const GetValidTab = (tab: TabsType): TabsType => {
    if (!tab || !Object.values(TabsTypes).some((t: TabsType) => t === tab)) 
    {
        return TabsTypes.All;
    }
    
    return tab;
}

export type TabsType = typeof TabsTypes[keyof typeof TabsTypes];