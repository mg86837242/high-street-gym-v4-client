import NavBarMinimal from '../../components/layouts/NavBarMinimal';
import Canvas from '../../components/ui/Canvas';

import SignupPanel from './SignupPanel';

export default function Signup() {
  return (
    <Canvas>
      <NavBarMinimal />
      <SignupPanel />
    </Canvas>
  );
}
