import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <main className="text-white font-body h-full">
      <Outlet />
    </main>
  );
}
