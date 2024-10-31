import { randomUUID, UUID } from 'crypto'
import * as fs from 'fs'

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/'

interface Pokemon {
    _uuid: string
    id: number
    name: string
    height: number
    weight: number
    abilities: {
        ability: PokeProp
    }[]
    forms: PokeProp[]
    held_items: {
        item: PokeProp
    }[]
    moves: {
        move: PokeProp
    }[]
    species: PokeProp
    sprites: {
        front_default: string
    }
    cries: {
        latest: string
    }
    types: {
        type: PokeProp
    }[]
}

interface PokeProp {
    name: string
    url: string
}

async function fetchPokemon(pokemonId: number): Promise<Pokemon> {
    const response = await fetch(`${POKEAPI_URL}${pokemonId}`)
    const data = (await response.json()) as Pokemon
    return { ...data, _uuid: randomUUID() }
}

function createTables(): string {
    const uuid_generate_v4 = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

    const pokemonTable = `CREATE TABLE pokemon (
    id UUID PRIMARY KEY,
    original_id INT NOT NULL,
    name TEXT NOT NULL,
    height INT NOT NULL,
    weight INT NOT NULL,
    species TEXT NOT NULL,
    image_url TEXT NOT NULL,
    cry_sound TEXT NOT NULL );`

    const abilityTable = `CREATE TABLE ability (
    id UUID PRIMARY KEY,
    original_id INT NOT NULL,
    name TEXT NOT NULL );`

    const formTable = `CREATE TABLE form (
    id UUID PRIMARY KEY,
    original_id INT NOT NULL,
    name TEXT NOT NULL );`

    const heldItemTable = `CREATE TABLE held_item (
    id UUID PRIMARY KEY,
    original_id INT NOT NULL,
    name TEXT NOT NULL );`

    const moveTable = `CREATE TABLE move (
    id UUID PRIMARY KEY,
    original_id INT NOT NULL,
    name TEXT NOT NULL );`

    const typeTable = `CREATE TABLE type (
    id UUID PRIMARY KEY,
    original_id INT NOT NULL,
    name TEXT NOT NULL );`

    const pokemonAbilityTable = `CREATE TABLE pokemon_ability (
    pokemon_id UUID,
    ability_id UUID,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (ability_id) REFERENCES ability(id) );`

    const pokemonFormTable = `CREATE TABLE pokemon_form (
    pokemon_id UUID,
    form_id UUID,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (form_id) REFERENCES form(id) );`

    const pokemonHeldItemTable = `CREATE TABLE pokemon_held_item (
    pokemon_id UUID,
    held_item_id UUID,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (held_item_id) REFERENCES held_item(id) );`

    const pokemonMoveTable = `CREATE TABLE pokemon_move (
    pokemon_id UUID,
    move_id UUID,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (move_id) REFERENCES move(id) );`

    const pokemonTypeTable = `CREATE TABLE pokemon_type (
    pokemon_id UUID,
    type_id UUID,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (type_id) REFERENCES type(id) );`

    const userTable = `CREATE TABLE profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL );`

    const voteTable = `CREATE TABLE vote (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID,
    pokemon_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profile(id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) );`

    return `${uuid_generate_v4}\n\n${pokemonTable}\n\n${abilityTable}\n\n${formTable}\n\n${heldItemTable}\n\n${moveTable}\n\n${typeTable}\n\n${pokemonAbilityTable}\n\n${pokemonFormTable}\n\n${pokemonHeldItemTable}\n\n${pokemonMoveTable}\n\n${pokemonTypeTable}\n\n${userTable}\n\n${voteTable}`
}

function insertPokemon(pokemon: Pokemon): string {
    return `INSERT INTO pokemon (id, original_id, name, height, weight, species, image_url, cry_sound) VALUES ('${pokemon._uuid}', '${pokemon.id}' , '${pokemon.name}', ${pokemon.height}, ${pokemon.weight}, '${pokemon.species.name}', '${pokemon.sprites.front_default}', '${pokemon.cries.latest}');`
}

function insertAbility(
    original_id: number,
    ability: { id: UUID; name: string }
): string {
    return `INSERT INTO ability (id, original_id, name) VALUES ('${ability.id}', '${original_id}' , '${ability.name}');`
}

function insertForm(
    original_id: number,
    form: { id: UUID; name: string }
): string {
    return `INSERT INTO form (id, original_id, name) VALUES ('${form.id}', '${original_id}' , '${form.name}');`
}

function insertHeldItem(
    original_id: number,
    item: { id: UUID; name: string }
): string {
    return `INSERT INTO held_item (id, original_id, name) VALUES ('${item.id}', '${original_id}' , '${item.name}');`
}

function insertMove(
    original_id: number,
    move: { id: UUID; name: string }
): string {
    return `INSERT INTO move (id, original_id, name) VALUES ('${move.id}', '${original_id}' , '${move.name}');`
}

function insertType(
    original_id: number,
    type: { id: UUID; name: string }
): string {
    return `INSERT INTO type (id, original_id, name) VALUES ('${type.id}', '${original_id}' , '${type.name}');`
}

function insertPokemonAbility(pokemon_id: string, ability_id: string): string {
    return `INSERT INTO pokemon_ability (pokemon_id, ability_id) VALUES ('${pokemon_id}', '${ability_id}');`
}

function insertPokemonForm(pokemon_id: string, form_id: string): string {
    return `INSERT INTO pokemon_form (pokemon_id, form_id) VALUES ('${pokemon_id}', '${form_id}');`
}

function insertPokemonHeldItem(pokemon_id: string, item_id: string): string {
    return `INSERT INTO pokemon_held_item (pokemon_id, held_item_id) VALUES ('${pokemon_id}', '${item_id}');`
}

function insertPokemonMove(pokemon_id: string, move_id: string): string {
    return `INSERT INTO pokemon_move (pokemon_id, move_id) VALUES ('${pokemon_id}', '${move_id}');`
}

function insertPokemonType(pokemon_id: string, type_id: string): string {
    return `INSERT INTO pokemon_type (pokemon_id, type_id) VALUES ('${pokemon_id}', '${type_id}');`
}

function urlToId(url: string): number {
    const match = url.match(/\/(\d+)\/$/)
    if (!match) {
        throw new Error(`No ID match in URL: ${url}`)
    }
    return parseInt(match[1], 10)
}

// main
;(async () => {
    const pokemons: Pokemon[] = []
    const abilities = new Map<number, { id: UUID; name: string }>()
    const forms = new Map<number, { id: UUID; name: string }>()
    const heldItems = new Map<number, { id: UUID; name: string }>()
    const moves = new Map<number, { id: UUID; name: string }>()
    const types = new Map<number, { id: UUID; name: string }>()

    for (let i = 1; i <= 100; ++i) {
        console.log(`Fetching pokemon ${i}`)
        const pokemon = await fetchPokemon(i)

        // Limit the number of moves to 5
        pokemon.moves = pokemon.moves.slice(0, 5)

        pokemons.push(pokemon)

        pokemon.abilities.forEach((ability) => {
            const id = urlToId(ability.ability.url)
            if (!abilities.has(id)) {
                abilities.set(id, {
                    id: randomUUID(),
                    name: ability.ability.name,
                })
            }
        })
        pokemon.forms.forEach((form) => {
            const id = urlToId(form.url)
            if (!forms.has(id)) {
                forms.set(id, { id: randomUUID(), name: form.name })
            }
        })
        pokemon.held_items.forEach((item) => {
            const id = urlToId(item.item.url)
            if (!heldItems.has(id)) {
                heldItems.set(id, {
                    id: randomUUID(),
                    name: item.item.name,
                })
            }
        })
        pokemon.moves.forEach((move) => {
            const id = urlToId(move.move.url)
            if (!moves.has(id)) {
                moves.set(id, {
                    id: randomUUID(),
                    name: move.move.name,
                })
            }
        })
        pokemon.types.forEach((type) => {
            const id = urlToId(type.type.url)
            if (!types.has(id)) {
                types.set(id, {
                    id: randomUUID(),
                    name: type.type.name,
                })
            }
        })
    }

    const insertRows: string[] = []

    abilities.forEach((ability, original_id) => {
        insertRows.push(insertAbility(original_id, ability))
    })
    forms.forEach((form, original_id) => {
        insertRows.push(insertForm(original_id, form))
    })
    heldItems.forEach((item, original_id) => {
        insertRows.push(insertHeldItem(original_id, item))
    })
    moves.forEach((move, original_id) => {
        insertRows.push(insertMove(original_id, move))
    })
    types.forEach((type, original_id) => {
        insertRows.push(insertType(original_id, type))
    })

    pokemons.forEach((pokemon) => {
        insertRows.push(insertPokemon(pokemon))
        pokemon.abilities.forEach((ability) => {
            insertRows.push(
                insertPokemonAbility(
                    pokemon._uuid,
                    abilities.get(urlToId(ability.ability.url))?.id ??
                        '<INVALID>'
                )
            )
        })
        pokemon.forms.forEach((form) => {
            insertRows.push(
                insertPokemonForm(
                    pokemon._uuid,
                    forms.get(urlToId(form.url))?.id ?? '<INVALID>'
                )
            )
        })
        pokemon.held_items.forEach((item) => {
            insertRows.push(
                insertPokemonHeldItem(
                    pokemon._uuid,
                    heldItems.get(urlToId(item.item.url))?.id ?? '<INVALID>'
                )
            )
        })
        pokemon.moves.forEach((move) => {
            insertRows.push(
                insertPokemonMove(
                    pokemon._uuid,
                    moves.get(urlToId(move.move.url))?.id ?? '<INVALID>'
                )
            )
        })
        pokemon.types.forEach((type) => {
            insertRows.push(
                insertPokemonType(
                    pokemon._uuid,
                    types.get(urlToId(type.type.url))?.id ?? '<INVALID>'
                )
            )
        })
    })

    const sqlScript = createTables() + '\n\n' + insertRows.join('\n')

    try {
        const filename = 'init-pokemons.sql'
        fs.writeFileSync(filename, sqlScript)
        console.log(`SQL script ${filename} generated successfully!`)
    } catch (err) {
        console.error('Error writing SQL script:', err)
    }
})()
