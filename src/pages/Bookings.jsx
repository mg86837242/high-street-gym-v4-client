import { Outlet } from 'react-router-dom';
import MainWrapper from '../components/MainWrapper';
import Breadcrumbs from '../components/Breadcrumbs';
import ContentGrid from '../components/Bookings/ContentGrid';
import Calendar from '../components/Bookings/Calendar';
// import Loading from '../components/Loading';

export default function Bookings() {
  return (
    <>
      <MainWrapper gap={'gap-1'} mt={'mt-5'} mb={'mb-20'}>
        <Breadcrumbs />
        <ContentGrid
          id={'bookings-content-wrapper'}
          className={`grid justify-center items-start w-full h-full grid-cols-1 grid-row-3 lg:grid-cols-3 lg:grid-row-1 gap-10 lg:gap-2 px-5`}
        >
          <Calendar />
          <Outlet />
          {/* <Loading
            className={
              'flex justify-center items-start col-[1_/_2] row-[1_/_4] lg:col-[1_/_4] lg:row-[1_/_2] w-full h-full sticky'
            }
          /> */}
        </ContentGrid>
      </MainWrapper>
    </>
  );
}
