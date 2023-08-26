import MainWrapper from '../../components/layouts/MainWrapper';

import { ProfilePanel } from './ProfilePanel';

export default function Profile() {
  return (
    <MainWrapper gap={'gap-16'} mt={''} mb={''}>
      <ProfilePanel />
    </MainWrapper>
  );
}
