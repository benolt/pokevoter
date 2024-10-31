import { Container, Flex, Spinner } from '@radix-ui/themes'

export const Loading = () => {
    return (
        <Container pt="9">
            <Flex direction="column" align="center">
                <Spinner size="3" />
            </Flex>
        </Container>
    )
}
