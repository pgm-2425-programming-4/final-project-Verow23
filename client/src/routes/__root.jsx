import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect, useState } from 'react'
import { getProjects } from '../queries/getProjects'
import { Sidebar } from '../components/app/Sidebar'

const queryClient = new QueryClient();

function DynamicRoutes() {
    const [projects, setProjects] = useState([])
    const { isPending, isError, error, data: responseData } = useQuery({
        queryKey: ["projects"]
        , queryFn: () => getProjects()
    })

    useEffect(() => {
        if (responseData) {
            setProjects(responseData.data);
            console.log(projects);
        }
    }, [responseData, projects])

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return < Sidebar projects={projects} />
}

export const Route = createRootRoute({
    component: () => {
        return (
            <>
                <QueryClientProvider client={queryClient}>
                    <div className="p-2 flex gap-2">
                        <Link to="/" className="[&.active]:font-bold">
                            Home
                        </Link>{' '}
                        <DynamicRoutes />
                        <h2>Info</h2>
                        <Link to="/about" className="[&.active]:font-bold">
                            About
                        </Link>
                    </div>
                    <hr />
                    <Outlet />
                    <TanStackRouterDevtools />
                </QueryClientProvider>
            </>)
    },
})