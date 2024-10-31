import express from 'express'
import pokemonController from '../../controllers/pokemon-controller'

const router = express.Router()

router.get('/vote', pokemonController.getPokemonsToVote)
router.post('/vote', pokemonController.postPokemonVote)

router.get('/my-top-votes', pokemonController.getMyTopVotes)

router.delete('/my-votes', pokemonController.deleteMyVotes)

export default router
