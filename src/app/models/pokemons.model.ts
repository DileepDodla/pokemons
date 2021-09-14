export interface PokemonResult {
    name: string,
    url: string
}

export interface Pokemons {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokemonResult[]
}