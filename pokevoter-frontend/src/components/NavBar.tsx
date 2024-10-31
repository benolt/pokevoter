import { Flex, IconButton, TabNav } from '@radix-ui/themes'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import useThemeContext from '../contexts/useThemeContext'

export const NavBar = () => {
    const { theme, toggleTheme } = useThemeContext()
    const location = useLocation()
    const pathname = location.pathname

    return (
        <TabNav.Root justify="center">
            <TabNav.Link
                asChild
                active={pathname === '/vote' || pathname === '/'}
            >
                <Link to="/vote">Vote</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname === '/my-top-votes'}>
                <Link to="/my-top-votes">My Top Votes</Link>
            </TabNav.Link>
            <TabNav.Link asChild>
                <Flex direction="column">
                    <IconButton
                        size="3"
                        variant="ghost"
                        highContrast
                        onClick={() => {
                            toggleTheme()
                        }}
                    >
                        {theme === 'dark' ? (
                            <MdOutlineDarkMode />
                        ) : (
                            <MdDarkMode />
                        )}
                    </IconButton>
                </Flex>
            </TabNav.Link>
        </TabNav.Root>
    )
}
