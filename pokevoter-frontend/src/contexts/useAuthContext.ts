import { useContext } from 'react'
import { AuthContext } from './SimpleAuthContext'

export default function useAuthContext() {
    return useContext(AuthContext)
}
