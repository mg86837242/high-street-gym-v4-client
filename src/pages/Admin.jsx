import MainWrapper from '../components/Layout/MainWrapper';
import { AdminPanel } from '../components/Panel/AdminPanel';

export default function Admin() {
  return (
    <MainWrapper gap={'gap-16'} mt={''} mb={''}>
      <AdminPanel />
    </MainWrapper>
  );
}
