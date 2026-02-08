/* NO Enums now, only const types
enum CharacterTypes {
    Villain = "Villain",
    Hero = "Hero",
    Anti_Hero = "Anti-Hero"
}*/

export const CharacterTypes = {
    Villain: "Villain",
    Hero: "Hero",
    Anti_Hero: "Anti-Hero"
} as const;

export type CharacterType = typeof CharacterTypes[keyof typeof CharacterTypes];