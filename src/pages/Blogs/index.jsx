import MainWrapper from '../../components/layouts/MainWrapper';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

import Content from './Content';

export default function Blogs() {
  return (
    <MainWrapper gap={'gap-3'} mt={'mt-4'} mb={'mb-20'}>
      <Breadcrumbs />
      <Content />
    </MainWrapper>
  );
}
