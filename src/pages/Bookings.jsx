import MainWrapper from '../components/MainWrapper';
import Breadcrumbs from '../components/Breadcrumbs';
import Content from '../components/Bookings/Content';

export default function Bookings() {
  return (
    <MainWrapper gap={'gap-3'} mt={'mt-4'} mb={'mb-20'}>
      <Breadcrumbs />
      <Content />
    </MainWrapper>
  );
}
