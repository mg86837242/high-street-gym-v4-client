import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faBlog, faUsers } from '@fortawesome/free-solid-svg-icons';

export function AdminPanel() {
  return (
    <div
      id='admin-panel-wrapper'
      className='flex h-full min-h-[calc(100vh-7.5rem)] w-full max-w-screen-2xl flex-col px-4 py-6 lg:flex-row'
    >
      <LeftSidePanel />
      <Outlet />
    </div>
  );
}

function LeftSidePanel() {
  const auth = useContext(AuthContext);

  return (
    <div id='admin-sidebar-wrapper' className='flex min-w-[18.5rem] flex-col gap-5 py-6 pr-6'>
      <div className='flex items-center justify-between gap-5'>
        <div className='avatar'>
          <div className='w-14 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
            <img src='https://picsum.photos/200/200?random=1&grayscale' alt='Demo profile picture' />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-lg'>Admin Panel</p>
          <p className='text-base'>
            Role: <span className='text-primary'>{auth.user?.role && auth.user.role}</span>
          </p>
        </div>
      </div>
      <nav>
        <ul className='flex flex-col'>
          <li>
            <NavLink
              to='activities'
              className={({ isActive }) =>
                `btn-ghost btn-sm btn flex h-full w-full items-center justify-start gap-2 px-2 py-1.5 font-normal ${
                  isActive && 'btn-active'
                }`
              }
            >
              <span>
                <FontAwesomeIcon icon={faDumbbell} className='h-4 w-4' />
              </span>
              <span className='flex items-center justify-start text-sm'>Manage Activities</span>
            </NavLink>
          </li>
          {auth.user?.role === 'Admin' && (
            <>
              <li>
                <NavLink
                  to='blogs'
                  className={({ isActive }) =>
                    `btn-ghost btn-sm btn flex h-full w-full items-center justify-start gap-2 px-2 py-1.5 font-normal ${
                      isActive && 'btn-active'
                    }`
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faBlog} className='h-4 w-4' />
                  </span>
                  <span className='flex items-center justify-start text-sm'>Manage Blog Posts</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='members'
                  className={({ isActive }) =>
                    `btn-ghost btn-sm btn flex h-full w-full items-center justify-start gap-2 px-2 py-1.5 font-normal ${
                      isActive && 'btn-active'
                    }`
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faUsers} className='h-4 w-4' />
                  </span>
                  <span className='flex items-center justify-start text-sm'>Manage Members</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export function AdminIndex() {
  return <Navigate to='activities' replace />;
}
