import { Outlet } from 'react-router-dom';

export default function Content() {
  return (
    <div
      id='blogs-content-wrapper'
      className='flex h-full min-h-[calc(100vh-7.5rem)] w-full max-w-screen-xl flex-col px-4'
    >
      <Outlet />
    </div>
  );
}
