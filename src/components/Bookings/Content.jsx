import { Outlet } from 'react-router-dom';
import Calendar from './Calendar';

export default function Content() {
  return (
    <div
      id='bookings-content-wrapper'
      className='grid items-start w-full h-full grid-cols-1 gap-10 px-4 lg:grid-cols-3 lg:grid-rows-1 lg:gap-2'
    >
      <Calendar />
      <Outlet />
    </div>
  );
}