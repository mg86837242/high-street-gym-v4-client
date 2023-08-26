import NavBarMinimal from '../../components/layouts/NavBarMinimal';
import Canvas from '../../components/ui/Canvas';

import LoginPanel from './LoginPanel';

export default function Login() {
  return (
    <Canvas>
      <NavBarMinimal />
      <LoginPanel />
    </Canvas>
  );
}
