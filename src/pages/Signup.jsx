import { useLoaderData } from 'react-router-dom';
import Canvas from '../components/AuthForm/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import SignupPanel from '../components/AuthForm/SignupPanel';

export function Component() {
  const { emails } = useLoaderData();

  return (
    <Canvas>
      <NavBarMinimal />
      <SignupPanel emails={emails} />
    </Canvas>
  );
}

Component.displayName = 'Signup';
