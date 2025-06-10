import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Sidebar } from '../components/app/Sidebar';


const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: () => {
        return (
            <>
                <QueryClientProvider client={queryClient}>
                    <div className="home" >
                        <Sidebar />
                        <Outlet />
                    </div>
                    <TanStackRouterDevtools />
                </QueryClientProvider>
            </>)
    },
})