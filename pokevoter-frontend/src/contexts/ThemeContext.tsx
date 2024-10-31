import { Theme } from '@radix-ui/themes'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

interface ThemeContextType {
    theme: 'light' | 'dark'
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        if (localTheme) {
            setTheme(localTheme as 'light' | 'dark')
        }
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
        localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
    }, [theme])

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

    return (
        <ThemeContext.Provider value={value}>
            <Theme appearance={theme}>{children}</Theme>
        </ThemeContext.Provider>
    )
}
