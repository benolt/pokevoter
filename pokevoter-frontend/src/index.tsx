import '@radix-ui/themes/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { AppRoutes } from './AppRoutes.tsx'
import { AuthProvider } from './contexts/SimpleAuthContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary
            fallback={<div>Something went wrong</div>}
            onError={console.error}
        >
            <ThemeProvider>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    </StrictMode>
)
