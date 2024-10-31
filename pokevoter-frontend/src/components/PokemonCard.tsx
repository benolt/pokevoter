import {
    Badge,
    Container,
    DataList,
    Flex,
    Heading,
    Section,
} from '@radix-ui/themes'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import useAuthContext from '../contexts/useAuthContext'
import { postPokemonVote } from '../services/vote-service'

export interface Pokemon {
    id: number
    name: string
    height: number
    weight: number
    species: string
    image_url: string
    cry_sound: string
    abilities: PokemonSkill[]
    forms: PokemonSkill[]
    held_items: PokemonSkill[]
    moves: PokemonSkill[]
    types: PokemonSkill[]
}

interface PokemonSkill {
    id: number
    name: string
}

export const PokemonCard = ({
    pokemonId,
    pokemons,
    onVoteSubmitted,
}: {
    pokemonId: number
    pokemons: Pokemon[]
    onVoteSubmitted?: () => void
}) => {
    const { userId } = useAuthContext()

    const crySoundRef = useRef<HTMLAudioElement | null>(null)

    const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonId)!

    useEffect(() => {
        crySoundRef.current = new Audio(pokemon.cry_sound)
    }, [])

    const playCrySound = () => {
        crySoundRef.current?.play()
    }

    const onVote = async () => {
        try {
            await postPokemonVote(userId!, pokemon.id)
            onVoteSubmitted?.()
        } catch (error) {
            toast.error(String(error))
        }
    }

    return (
        <Container>
            <Flex direction="column" align="center" pb="4">
                <Section
                    pt="0"
                    pb="3"
                    onClick={onVote}
                    style={{
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        borderRadius: '8px',
                        transition: 'border-color 0.3s ease',
                    }}
                    onPointerEnter={(e) =>
                        (e.currentTarget.style.borderColor = 'blue')
                    }
                    onPointerLeave={(e) =>
                        (e.currentTarget.style.borderColor = 'transparent')
                    }
                >
                    <img
                        width="96"
                        height="96"
                        src={pokemon.image_url}
                        alt={pokemon.name}
                    />
                    <Heading align="center">
                        {pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1)}
                    </Heading>
                </Section>
                <DataList.Root
                    orientation={{
                        initial: 'vertical',
                        md: 'horizontal',
                    }}
                >
                    <DataList.Item align="center">
                        <DataList.Label>Height</DataList.Label>
                        <DataList.Value>{pokemon.height} dm</DataList.Value>
                    </DataList.Item>
                    <DataList.Item align="center">
                        <DataList.Label>Weight</DataList.Label>
                        <DataList.Value>{pokemon.weight} hg</DataList.Value>
                    </DataList.Item>
                    <DataList.Item align="center">
                        <DataList.Label>Species</DataList.Label>
                        <DataList.Value>{pokemon.species}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item
                        align={{
                            initial: 'center',
                            md: 'start',
                        }}
                    >
                        <DataList.Label>Abilities</DataList.Label>
                        <DataList.Value>
                            <Flex
                                direction="column"
                                align={{
                                    initial: 'center',
                                    md: 'start',
                                }}
                                height={`${
                                    Math.max(
                                        ...pokemons.map(
                                            (p) => p.abilities.length
                                        )
                                    ) * 20
                                }px`}
                            >
                                {pokemon.abilities.length === 0 ? (
                                    <Badge color="red">---</Badge>
                                ) : (
                                    pokemon.abilities.map((ability) => (
                                        <span key={ability.id}>
                                            {ability.name}
                                        </span>
                                    ))
                                )}
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item
                        align={{
                            initial: 'center',
                            md: 'start',
                        }}
                    >
                        <DataList.Label>Forms</DataList.Label>
                        <DataList.Value>
                            <Flex
                                direction="column"
                                align={{
                                    initial: 'center',
                                    md: 'start',
                                }}
                                height={`${
                                    Math.max(
                                        ...pokemons.map((p) => p.forms.length)
                                    ) * 20
                                }px`}
                            >
                                {pokemon.forms.length === 0 ? (
                                    <Badge color="red">---</Badge>
                                ) : (
                                    pokemon.forms.map((form) => (
                                        <span key={form.id}>{form.name}</span>
                                    ))
                                )}
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item
                        align={{
                            initial: 'center',
                            md: 'start',
                        }}
                    >
                        <DataList.Label>Held Items</DataList.Label>
                        <DataList.Value>
                            <Flex
                                direction="column"
                                align={{
                                    initial: 'center',
                                    md: 'start',
                                }}
                                height={`${
                                    Math.max(
                                        ...pokemons.map(
                                            (p) => p.held_items.length
                                        )
                                    ) * 20
                                }px`}
                            >
                                {pokemon.held_items.length === 0 ? (
                                    <Badge color="red">---</Badge>
                                ) : (
                                    pokemon.held_items.map((item) => (
                                        <span key={item.id}>{item.name}</span>
                                    ))
                                )}
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item
                        align={{
                            initial: 'center',
                            md: 'start',
                        }}
                    >
                        <DataList.Label>Moves</DataList.Label>
                        <DataList.Value>
                            <Flex
                                direction="column"
                                align={{
                                    initial: 'center',
                                    md: 'start',
                                }}
                                height={`${
                                    Math.max(
                                        ...pokemons.map((p) => p.moves.length)
                                    ) * 20
                                }px`}
                            >
                                {pokemon.moves.length === 0 ? (
                                    <Badge color="red">---</Badge>
                                ) : (
                                    pokemon.moves.map((move) => (
                                        <span key={move.id}>{move.name}</span>
                                    ))
                                )}
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item
                        align={{
                            initial: 'center',
                            md: 'start',
                        }}
                    >
                        <DataList.Label>Types</DataList.Label>
                        <DataList.Value>
                            <Flex
                                direction="column"
                                align={{
                                    initial: 'center',
                                    md: 'start',
                                }}
                                height={`${
                                    Math.max(
                                        ...pokemons.map((p) => p.types.length)
                                    ) * 20
                                }px`}
                            >
                                {pokemon.types.length === 0 ? (
                                    <Badge color="red">---</Badge>
                                ) : (
                                    pokemon.types.map((type) => (
                                        <span key={type.id}>{type.name}</span>
                                    ))
                                )}
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item align="center">
                        <DataList.Label>Cry Sound</DataList.Label>
                        <DataList.Value>
                            <Badge
                                color="orange"
                                radius="full"
                                onClick={playCrySound}
                            >
                                <button>Click to listen</button>
                            </Badge>
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </Flex>
        </Container>
    )
}
