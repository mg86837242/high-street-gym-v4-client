import Canvas from '../components/Panels/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import LoginPanel from '../components/Panels/LoginPanel';

export default function Login() {
  return (
    <Canvas>
      <NavBarMinimal />
      <LoginPanel />
    </Canvas>
  );
}
