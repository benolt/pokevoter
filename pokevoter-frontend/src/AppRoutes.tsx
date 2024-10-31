import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './components/Root'
import ErrorPage from './pages/ErrorPage'
import { MyTopVotesPage } from './pages/MyTopVotesPage'
import { VotePage } from './pages/VotePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <VotePage />,
            },
            {
                path: '/vote',
                element: <VotePage />,
            },
            {
                path: '/my-top-votes',
                element: <MyTopVotesPage />,
            },
        ],
    },
])

export const AppRoutes = () => {
    return <RouterProvider router={router} />
}
