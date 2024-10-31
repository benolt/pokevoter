import { Pokemon } from '../components/PokemonCard'
import { MyTopVote } from '../components/VotesTable'

const POKEVOTE_SERVICE_BASE_URL = import.meta.env
    .VITE_POKEVOTE_SERVICE_BASE_URL as string

export async function getPokemonVote(userId: string) {
    const response = await fetch(
        `${POKEVOTE_SERVICE_BASE_URL}/api/v1/pokemon/vote`,
        {
            headers: {
                'X-Username': userId,
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    return (await response.json()) as Pokemon[]
}

export async function postPokemonVote(userId: string, pokemonId: number) {
    const response = await fetch(
        `${POKEVOTE_SERVICE_BASE_URL}/api/v1/pokemon/vote`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Username': userId,
            },
            body: JSON.stringify({ pokemon_id: pokemonId }),
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
}

export async function getMyTopVotes(userId: string) {
    const response = await fetch(
        `${POKEVOTE_SERVICE_BASE_URL}/api/v1/pokemon/my-top-votes`,
        {
            headers: {
                'X-Username': userId,
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    return (await response.json()) as MyTopVote[]
}

export async function deleteMyVotes(userId: string) {
    const response = await fetch(
        `${POKEVOTE_SERVICE_BASE_URL}/api/v1/pokemon/my-votes`,
        {
            method: 'DELETE',
            headers: {
                'X-Username': userId,
            },
        }
    )

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
}
