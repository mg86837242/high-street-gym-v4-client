import { useLoaderData } from 'react-router-dom';
import Canvas from '../components/Panels/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import SignupPanel from '../components/Panels/SignupPanel';

export default function Signup() {
  const { emails } = useLoaderData();

  return (
    <Canvas>
      <NavBarMinimal />
      <SignupPanel emails={emails} />
    </Canvas>
  );
}
