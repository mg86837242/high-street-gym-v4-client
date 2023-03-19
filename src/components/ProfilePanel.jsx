import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LinkButton1Full from './UI/LinkButton1Full';
import Button4Full from './UI/Button4Full';

export default function ProfilePanel() {
  return (
    <div
      id='profile-panel-wrapper'
      className='flex flex-col w-full max-w-lg gap-8 px-10 pt-12 pb-8 my-auto bg-neutral rounded-xl shadow-[0_0_30px_15px_rgba(255,255,255,0.2)]'
    >
      <Greetings />
    </div>
  );
}

function Greetings() {
  const { authenticatedUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-10'>
      <p className='text-2xl font-extrabold leading-6 focus:outline-none text-primary-content'>
        Greetings,{' '}
        <span className='text-primary'>
          {authenticatedUser?.firstName} {authenticatedUser?.lastName}!
        </span>
      </p>
      <p className='text-2xl font-extrabold leading-6 focus:outline-none text-primary-content'>
        You have logged in as {authenticatedUser?.role === 'Admin' ? 'an' : 'a'}{' '}
        <span className='text-primary'>{authenticatedUser.role}!</span>
      </p>
      <div className='flex flex-col gap-5'>
        <LinkButton1Full to={'/'}>Visit Home</LinkButton1Full>
        <Button4Full
          onClick={() => {
            handleLogout();
            navigate('/');
          }}
        >
          Logout
        </Button4Full>
      </div>
    </div>
  );
}
