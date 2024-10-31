import { randomUUID } from 'crypto'
import { Pokemon } from '../database/pokemon-models'
import { getPokemonsByIds } from '../database/pokemon-queries'
import { Profile, Vote } from '../database/vote-models'
import { getMyTopVotes as getMyTopVotesQuery } from '../database/vote-queries'
import { NotFoundError } from '../errors'
import { getDistinctRandomNumbers } from '../utils'

const getPokemonsToVote = async () => {
    const distinctRandomNumbers = getDistinctRandomNumbers(1, 100, 2)
    const pokemons = await getPokemonsByIds(distinctRandomNumbers)
    return pokemons.map((p) => p.toJSON())
}

const postPokemonVote = async (username: string, pokemon_id: number) => {
    const pokemon = await Pokemon.findOne({
        where: {
            original_id: pokemon_id,
        },
    })
    if (!pokemon) {
        throw new NotFoundError(`Pokemon with ID ${pokemon_id} not found`)
    }

    const profile =
        (await Profile.findOne({
            where: {
                username,
            },
        })) ??
        (await Profile.create({
            id: randomUUID(),
            username,
        }))

    await Vote.create({
        profile_id: profile.id,
        pokemon_id: pokemon.id,
    })
}

const getMyTopVotes = async (username: string) => {
    const myTopVotes = await getMyTopVotesQuery(username)
    return myTopVotes.map((v) => v.toJSON())
}

const deleteMyVotes = async (username: string) => {
    const profile = await Profile.findOne({ where: { username } })

    if (!profile) {
        throw new NotFoundError(`Profile with username ${username} not found`)
    }

    await Vote.destroy({
        where: {
            profile_id: profile.id,
        },
    })
}

export default {
    getPokemonsToVote,
    postPokemonVote,
    getMyTopVotes,
    deleteMyVotes,
}
