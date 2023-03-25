import MainWrapper from '../components/MainWrapper';
import UnderConstruction from '../components/UnderConstruction';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Blogs() {
  return (
    <MainWrapper gap={'gap-16'} mt={'mt-16'} mb={'mb-20'}>
      <Skeleton />
      <UnderConstruction
        pageName={'blogs'}
        imageUrl={
          'https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
      />
    </MainWrapper>
  );
}
