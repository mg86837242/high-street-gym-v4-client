import { Outlet } from 'react-router-dom';
import MainWrapper from '../components/MainWrapper';
import Breadcrumbs from '../components/Breadcrumbs';
import Calendar from '../components/Bookings/Calendar';

export default function Bookings() {
  return (
    <>
      <MainWrapper gap={'gap-1'} mt={'mt-5'} mb={'mb-20'}>
        <Breadcrumbs />
        <div
          id='bookings-content-wrapper'
          className='grid items-start w-full h-full grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-10 lg:gap-2 px-5'
        >
          <Calendar />
          <Outlet />
        </div>
      </MainWrapper>
    </>
  );
}
