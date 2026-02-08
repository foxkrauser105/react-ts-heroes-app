import type { ICharacter } from "../interfaces/ICharacter";
import type { ISummaryResponse } from "../interfaces/ISummaryResponse";

export const heroStatsMockData: ISummaryResponse = {
    totalHeroes: 25,
    strongestHero: {
        id: "1",
        name: "Clark Kent",
        slug: "clark-kent",
        alias: "Superman",
        powers: [
            "Súper fuerza",
            "Vuelo",
            "Visión de calor",
            "Visión de rayos X",
            "Invulnerabilidad",
            "Súper velocidad"
        ],
        description: "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
        strength: 10,
        intelligence: 8,
        speed: 9,
        durability: 10,
        team: "Liga de la Justicia",
        image: "1.jpeg",
        firstAppearance: "1938",
        status: "Active",
        category: "Hero",
        universe: "DC"
    } as ICharacter,
    smartestHero: {
        id: "2",
        name: "Bruce Wayne",
        slug: "bruce-wayne",
        alias: "Batman",
        powers: [
            "Artes marciales",
            "Habilidades de detective",
            "Tecnología avanzada",
            "Sigilo",
            "Genio táctico"
        ],
        description: "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
        strength: 6,
        intelligence: 10,
        speed: 6,
        durability: 7,
        team: "Liga de la Justicia",
        image: "2.jpeg",
        firstAppearance: "1939",
        status: "Active",
        category: "Hero",
        universe: "DC"
    } as ICharacter,
    heroCount: 18,
    villainCount: 7
}