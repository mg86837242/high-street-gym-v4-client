import Canvas from '../components/UI/Canvas';
import NavBarMinimal from '../components/Layout/NavBarMinimal';
import LoginPanel from '../components/Panel/LoginPanel';

export default function Login() {
  return (
    <Canvas>
      <NavBarMinimal />
      <LoginPanel />
    </Canvas>
  );
}
