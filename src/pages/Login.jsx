import Canvas from '../components/UI/Canvas';
import NavBarMinimal from '../components/layouts/NavBarMinimal';
import LoginPanel from '../components/panels/LoginPanel';

export default function Login() {
  return (
    <Canvas>
      <NavBarMinimal />
      <LoginPanel />
    </Canvas>
  );
}
