import Canvas from '../components/AuthForm/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import SignupPanel from '../components/AuthForm/SignupPanel';

export default function Signup() {
  return (
    <Canvas>
      <NavBarMinimal />
      <SignupPanel />
    </Canvas>
  );
}
