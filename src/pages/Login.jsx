import Canvas from '../components/AuthPanels/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import LoginPanel from '../components/AuthPanels/LoginPanel';

export default function Login() {
  return (
    <Canvas>
      <NavBarMinimal />
      <LoginPanel />
    </Canvas>
  );
}
