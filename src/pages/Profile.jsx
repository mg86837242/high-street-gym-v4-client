import Canvas from '../components/AuthForm/Canvas';
import NavBarMinimal from '../components/NavBarMinimal';
import ProfilePanel from '../components/ProfilePanel';

export default function Profile() {
  return (
    <Canvas>
      <NavBarMinimal />
      <ProfilePanel />
    </Canvas>
  );
}
