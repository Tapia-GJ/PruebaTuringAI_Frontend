import { Outlet } from 'react-router-dom';
export const MainLayout = () => {
    return (
        <div>
            <header>Navbar</header>
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>);
};
