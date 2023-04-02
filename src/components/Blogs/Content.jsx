import { Outlet } from 'react-router-dom';

export default function Content() {
  return (
    <div
      id='blogs-content-wrapper'
      className='flex flex-col w-full h-full px-4 py-6 max-w-screen-xl min-h-[calc(100vh-7.5rem)]'
    >
      <Outlet />
    </div>
  );
}
