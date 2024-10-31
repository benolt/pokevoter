import { Badge, Container, Flex, Section, Table } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useAuthContext from '../contexts/useAuthContext'
import { deleteMyVotes, getMyTopVotes } from '../services/vote-service'
import { Loading } from './Loading'

export interface MyTopVote {
    original_id: number
    name: string
    image_url: string
    cry_sound: string
    vote_count: number
    latest_vote: Date
}

export const VotesTable = () => {
    const { userId } = useAuthContext()

    const [isLoading, setIsLoading] = useState(true)
    const [myTopVotes, setMyTopVotes] = useState<MyTopVote[]>([])

    useEffect(() => {
        const fetchMyTopVotes = async () => {
            if (userId) {
                setMyTopVotes(await getMyTopVotes(userId))
            }
        }

        setIsLoading(true)
        fetchMyTopVotes().catch((error) => {
            toast.error(error.message)
        })
        setIsLoading(false)
    }, [userId])

    const playCrySound = (crySound: string) => {
        const audio = new Audio(crySound)
        audio.play()
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Container>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell align="center">
                            Rank
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align="center">
                            Pokemon
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align="center">
                            Name
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align="center">
                            Votes
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                {myTopVotes.map((pokemon, i) => (
                    <Table.Body
                        key={pokemon.original_id}
                        onClick={() => playCrySound(pokemon.cry_sound)}
                        style={{
                            cursor: 'default',
                        }}
                    >
                        <Table.Row>
                            <Table.Cell align="center" pt="5" pb="0">
                                {i + 1}
                            </Table.Cell>
                            <Table.Cell align="center">
                                <img
                                    width="48"
                                    height="48"
                                    src={pokemon.image_url}
                                    alt={pokemon.name}
                                />
                            </Table.Cell>
                            <Table.RowHeaderCell align="center" pt="5" pb="0">
                                {pokemon.name.charAt(0).toUpperCase() +
                                    pokemon.name.slice(1)}
                            </Table.RowHeaderCell>
                            <Table.Cell align="center" pt="5" pb="0">
                                {pokemon.vote_count}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table.Root>
            <Section pt="6" pb="6">
                <Flex direction="column" align="center">
                    <Badge
                        color="red"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            deleteMyVotes(userId!).catch((error) => {
                                toast.error(error.message)
                            })
                            setMyTopVotes([])
                        }}
                    >
                        Reset My Votes
                    </Badge>
                </Flex>
            </Section>
        </Container>
    )
}
