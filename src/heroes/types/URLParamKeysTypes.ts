export const URLParamKeysTypes = {
    Page: 'page',
    Limit: 'limit',
    Tab: 'tab',
    Category: 'category',
    Name: 'name',
    Team: 'team',
    Universe: 'universe',
    Status: 'status',
    Strength: 'strength',
    ActiveAccordion: 'active-accordion'
} as const;    

export type URLParamKeysType = typeof URLParamKeysTypes[keyof typeof URLParamKeysTypes];