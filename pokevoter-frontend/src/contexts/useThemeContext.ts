import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export default function useThemeContext() {
    return useContext(ThemeContext)
}
