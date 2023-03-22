import Canvas from '../components/AuthUI/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import LoginPanel from '../components/AuthUI/LoginPanel';

export default function Login() {
  return (
    <Canvas>
      <NavBarMinimal />
      <LoginPanel />
    </Canvas>
  );
}
