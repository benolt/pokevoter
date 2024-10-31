import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../errors'
import pokemonService from '../services/pokemon-service'

const getPokemonsToVote = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const pokemons = await pokemonService.getPokemonsToVote()
        response.status(200).send(pokemons)
    } catch (error) {
        next(error)
        return
    }
}

const postPokemonVote = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { username } = request
    const { pokemon_id } = request.body

    try {
        await pokemonService.postPokemonVote(username as string, pokemon_id)
    } catch (error) {
        if (error instanceof NotFoundError) {
            response.status(404).send(error.message)
            return
        } else {
            next(error)
            return
        }
    }

    response.status(200).send('Vote submitted')
}

const getMyTopVotes = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { username } = request

    try {
        const topVotes = await pokemonService.getMyTopVotes(username as string)
        response.status(200).send(topVotes)
    } catch (error) {
        next(error)
        return
    }
}

const deleteMyVotes = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { username } = request

    try {
        await pokemonService.deleteMyVotes(username as string)
        response.status(200).send('Votes deleted')
    } catch (error) {
        if (error instanceof NotFoundError) {
            response.status(404).send(error.message)
            return
        } else {
            next(error)
            return
        }
    }
}

export default {
    getPokemonsToVote,
    postPokemonVote,
    getMyTopVotes,
    deleteMyVotes,
}
