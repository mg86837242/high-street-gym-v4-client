import Canvas from '../components/AuthForm/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import ProfilePanel from '../components/ProfilePanel';

export default function Component() {
  return (
    <Canvas>
      <NavBarMinimal />
      <ProfilePanel />
    </Canvas>
  );
}

Component.displayName = 'Profile';
