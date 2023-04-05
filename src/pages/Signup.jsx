import { useLoaderData } from 'react-router-dom';
import Canvas from '../components/UI/Canvas';
import NavBarMinimal from '../components/Layout/NavBarMinimal';
import SignupPanel from '../components/Panel/SignupPanel';

export default function Signup() {
  const { emails } = useLoaderData();

  return (
    <Canvas>
      <NavBarMinimal />
      <SignupPanel emails={emails} />
    </Canvas>
  );
}
