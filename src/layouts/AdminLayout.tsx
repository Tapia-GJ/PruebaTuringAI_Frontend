import { Outlet } from 'react-router-dom';
export const AdminLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <aside>Admin Sidebar</aside>
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
        </div>);
};
