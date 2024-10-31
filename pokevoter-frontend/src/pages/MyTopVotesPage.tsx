import { Container } from '@radix-ui/themes'
import { SwitchUser } from '../components/SwitchUser'
import { VotesTable } from '../components/VotesTable'

export const MyTopVotesPage = () => {
    return (
        <Container>
            <SwitchUser />
            <VotesTable />
        </Container>
    )
}
