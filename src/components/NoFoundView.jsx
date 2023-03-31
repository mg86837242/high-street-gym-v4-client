import Canvas from './Panels/Canvas';
import NavBarMinimal from './NavBarMinimal';

export default function NoFoundView() {
  return (
    <Canvas>
      <NavBarMinimal />
    </Canvas>
  );
}

// References for role-based routing in RRD 6.4+:
// -- https://stackoverflow.com/questions/72090838/how-to-do-non-existent-routes-redirect-to-homepage-in-react-router-dom: Redirect and 404 method
// -- https://stackoverflow.com/questions/70743498/role-based-react-router: Custom Hook and wrapper component method
// -- https://codesandbox.io/s/5d40ro: Another alternative solution, prolly not recommended by the official
// -- https://github.com/remix-run/react-router/discussions/9564: The Official team is working on a middleware feature,
//  to help pass context to the loader
// -- Discord: "I would create a single route with all router, then in the loader of the routes I would check the role
//  of the user and if it doesn’t have access I would either render a 404 (to hide the existence of the route) or
//  redirect (if the user can know that exists but it doesn’t have access)", by Sergio
