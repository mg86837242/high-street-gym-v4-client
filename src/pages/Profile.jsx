import MainWrapper from '../components/MainWrapper';
import { ProfilePanel } from '../components/AuthUI/ProfilePanel';
import Spinner2 from '../components/Spinner2';

export default function Profile() {
  return (
    <MainWrapper gap={'gap-16'} mt={''} mb={''}>
      <ProfilePanel />
      <Spinner2 />
    </MainWrapper>
  );
}
