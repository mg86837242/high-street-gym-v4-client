import MainWrapper from '../components/MainWrapper';
import { ProfilePanel } from '../components/Panel/ProfilePanel';

export default function Profile() {
  return (
    <MainWrapper gap={'gap-16'} mt={''} mb={''}>
      <ProfilePanel />
    </MainWrapper>
  );
}
