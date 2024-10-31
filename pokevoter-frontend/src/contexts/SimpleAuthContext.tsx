import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import * as userService from '../services/user-service'

interface AuthContextType {
    userId?: string
    changeUserId?: (newUserId: string) => void
}

export const AuthContext = createContext<AuthContextType>({})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<string | undefined>(undefined)

    useEffect(() => {
        setUserId(userService.getCurrentUserId())
    }, [])

    const changeUserId = useCallback((newUserId: string) => {
        userService.setUserId(newUserId)
        setUserId(newUserId)
    }, [])

    const memoizedValue = useMemo(
        () => ({ userId, changeUserId }),
        [userId, changeUserId]
    )

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    )
}
