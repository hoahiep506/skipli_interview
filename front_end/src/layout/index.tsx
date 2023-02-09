import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='w-screen h-screen overflow-hidden antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900'>
      <Outlet />
    </div>
  );
};

export default Layout;
