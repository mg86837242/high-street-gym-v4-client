import MainWrapper from '../components/MainWrapper';
import { ProfilePanel } from '../components/AuthUI/ProfilePanel';

export default function Profile() {
  return (
    <MainWrapper gap={'gap-16'} mt={''} mb={''}>
      <ProfilePanel />
    </MainWrapper>
  );
}
