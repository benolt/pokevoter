import { Container, Flex } from '@radix-ui/themes'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { NavBar } from './NavBar'

export const Root = () => {
    return (
        <Container size="2">
            <Toaster position="bottom-center" richColors />
            <NavBar />
            <Flex direction="column" align="center">
                <Outlet />
            </Flex>
        </Container>
    )
}
