import { useLoaderData } from 'react-router-dom';
import Canvas from '../../components/ui/Canvas';
import NavBarMinimal from '../../components/layouts/NavBarMinimal';
import SignupPanel from './SignupPanel';

export default function Signup() {
  const { emails } = useLoaderData();

  return (
    <Canvas>
      <NavBarMinimal />
      <SignupPanel emails={emails} />
    </Canvas>
  );
}
