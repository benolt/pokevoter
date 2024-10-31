import { Container, Flex } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loading } from '../components/Loading'
import { Pokemon, PokemonCard } from '../components/PokemonCard'
import useAuthContext from '../contexts/useAuthContext'
import { getPokemonVote } from '../services/vote-service'

export const VotePage = () => {
    const { userId } = useAuthContext()

    const [isLoading, setIsLoading] = useState(true)
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [refreshPokemons, setRefreshPokemons] = useState(true)

    useEffect(() => {
        const fetchPokemonVote = async () => {
            if (userId) {
                setPokemons(await getPokemonVote(userId))
            }
        }

        if (userId && refreshPokemons) {
            setIsLoading(true)
            fetchPokemonVote().catch((error) => {
                toast.error(error.message)
            })
            setIsLoading(false)
            setRefreshPokemons(false)
        }
    }, [userId, refreshPokemons])

    if (isLoading) {
        return <Loading />
    }

    return (
        <Container size="2">
            <Flex direction="row" gap="4">
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemonId={pokemon.id}
                        pokemons={pokemons}
                        onVoteSubmitted={() => setRefreshPokemons(true)}
                    />
                ))}
            </Flex>
        </Container>
    )
}
