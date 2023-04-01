import Canvas from '../components/Panel/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import LoginPanel from '../components/Panel/LoginPanel';

export default function Login() {
  return (
    <Canvas>
      <NavBarMinimal />
      <LoginPanel />
    </Canvas>
  );
}
