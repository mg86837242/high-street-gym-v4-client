import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import UnderConstruction from '../UnderConstruction';

export function AdminPanel() {
  return (
    <div
      id='admin-panel-wrapper'
      className='flex flex-col w-full h-full px-4 py-6 md:flex-row max-w-7xl min-h-[calc(100vh-7.5rem)]'
    >
      <LeftSidePanel />
      <Outlet />
    </div>
  );
}

function LeftSidePanel() {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <div id='admin-sidebar-wrapper' className='flex flex-col gap-5 py-6 pr-6 w-[18.5rem]'>
      <div className='flex items-center justify-between gap-5'>
        <div className='avatar'>
          <div className='w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src='https://picsum.photos/200/200?random=1&grayscale' />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-lg'>Greetings,</p>
          <p className='text-lg text-primary'>{authenticatedUser?.username && authenticatedUser.username}</p>
        </div>
      </div>
      <p className='text-right'>
        You have logged in as{' '}
        <span className='text-secondary'>
          {authenticatedUser?.role ? authenticatedUser.role.toLowerCase() : 'unknown role'}
        </span>
      </p>
      <nav>
        <ul className='flex flex-col'>
          {authenticatedUser?.role === 'Admin' && (
            <li>
              <NavLink
                to='blogs'
                className={({ isActive }) =>
                  `flex items-center justify-start w-full h-full gap-2 px-2 font-normal btn btn-sm btn-ghost py-1.5 ${
                    isActive && 'btn-active'
                  }`
                }
              >
                <span>
                  <FontAwesomeIcon icon={faPenToSquare} className='w-4 h-4' />
                </span>
                <span className='flex items-center justify-start text-sm'>Manage Blog Posts</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to='activities'
              className={({ isActive }) =>
                `flex items-center justify-start w-full h-full gap-2 px-2 font-normal btn btn-sm btn-ghost py-1.5 ${
                  isActive && 'btn-active'
                }`
              }
            >
              <span>
                <FontAwesomeIcon icon={faPersonRunning} className='w-4 h-4' />
              </span>
              <span className='flex items-center justify-start text-sm'>Manage Activities</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export function AdminIndex() {
  const { authenticatedUser } = useContext(AuthContext);

  return authenticatedUser?.role === 'Admin' ? <Navigate to='blogs' replace /> : <Navigate to='activities' replace />;
}

export function AdminEditBlogs() {
  return (
    <UnderConstruction
      pageName={'admin edit blogs'}
      imageUrl={
        'https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    />
  );
}
