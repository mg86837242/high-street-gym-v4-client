import MainWrapper from '../components/MainWrapper';
import { AdminPanel } from '../components/Panels/AdminPanel';

export default function Admin() {
  return (
    <MainWrapper gap={'gap-16'} mt={''} mb={''}>
      <AdminPanel />
    </MainWrapper>
  );
}
