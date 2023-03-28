import MainWrapper from '../components/MainWrapper';
import UnderConstruction from '../components/UnderConstruction';

export default function Blogs() {
  return (
    <MainWrapper gap={'gap-16'} mt={'mt-16'} mb={'mb-20'}>
      <UnderConstruction
        pageName={'blogs'}
        imageUrl={
          'https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80'
        }
      />
    </MainWrapper>
  );
}
