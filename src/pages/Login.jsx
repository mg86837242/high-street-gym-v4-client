import Canvas from '../components/AuthForm/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import LoginPanel from '../components/AuthForm/LoginPanel';

export default function Component() {
  return (
    <Canvas>
      <NavBarMinimal />
      <LoginPanel />
    </Canvas>
  );
}

Component.displayName = 'Login';
