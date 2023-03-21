import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

export default function ProfilePanel() {
  return (
    <div id='profile-panel-wrapper' className='flex  w-full lg:w-4/5 h-full'>
      <LeftSideBar />
      <ProfileFormPanel />
    </div>
  );
}

export function LeftSideBar() {
  const { authenticatedUser } = useContext(AuthContext);
  return (
    <div id='profile-sidebar-wrapper' className='flex flex-col w-[17rem]'>
      <p className='text-2xl'>{authenticatedUser.username}</p>
      <nav className=''>
        <ul>
          <NavLink>
            <li className='px-6 py-1 text-sm'>Edit My Profile</li>
          </NavLink>
          <NavLink>
            <li className='px-6 py-1 text-sm'>Edit My Blogs</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export function ProfileFormPanel() {
  return (
    <div>
      <h1>I'm form panel</h1>
    </div>
  );
}
