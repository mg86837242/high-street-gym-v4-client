import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

export default function ProfilePanel() {
  return (
    <div id='profile-panel-wrapper' className='flex w-full h-full max-w-7xl'>
      <LeftSideBar />
      <ProfileFormPanel />
    </div>
  );
}

export function LeftSideBar() {
  const { authenticatedUser } = useContext(AuthContext);
  return (
    <div id='profile-sidebar-wrapper' className='flex flex-col w-[18.5rem] pr-6 py-6'>
      <div className='flex justify-between items-center'>
        <div className='avatar'>
          <div className='w-14 rounded-full'>
            <img src='https://picsum.photos/200?grayscale&random=1' />
          </div>
        </div>
        <p className='text-2xl'>{authenticatedUser.username}</p>
      </div>
      <nav>
        <ul className='flex flex-col'>
          <NavLink>
            <li className='px-2 py-1.5 text-sm'>Edit My Profile</li>
          </NavLink>
          <NavLink>
            <li className='px-2 py-1.5 text-sm'>Edit My Blogs</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export function ProfileFormPanel() {
  return (
    <div className='flex-grow py-6'>
      <h1>I'm form panel</h1>
    </div>
  );
}
