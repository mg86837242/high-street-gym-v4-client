import { useLoaderData } from 'react-router-dom';
import Canvas from '../components/UI/Canvas';
import NavBarMinimal from '../components/layouts/NavBarMinimal';
import SignupPanel from '../components/panels/SignupPanel';

export default function Signup() {
  const { emails } = useLoaderData();

  return (
    <Canvas>
      <NavBarMinimal />
      <SignupPanel emails={emails} />
    </Canvas>
  );
}
