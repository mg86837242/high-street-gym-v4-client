import Canvas from './AuthForm/Canvas';
import NavBarMinimal from './NavBarMinimal';

export default function NoFoundView() {
  return (
    <Canvas>
      <NavBarMinimal />
    </Canvas>
  );
}

// References:
// -- https://stackoverflow.com/questions/72090838/how-to-do-non-existent-routes-redirect-to-homepage-in-react-router-dom
