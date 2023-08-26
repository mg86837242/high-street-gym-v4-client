import MainWrapper from '../../components/layouts/MainWrapper';

import { AdminPanel } from './AdminPanel';

export default function Admin() {
  return (
    <MainWrapper gap={'gap-16'} mt={''} mb={''}>
      <AdminPanel />
    </MainWrapper>
  );
}
