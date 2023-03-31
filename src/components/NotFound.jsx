import { useNavigate } from 'react-router-dom';
import NavBarMinimal from './NavBarMinimal';

export function NotFoundView() {
  const navigate = useNavigate();

  return (
    <div
      id='canvas'
      className='flex flex-col items-center w-full h-full pb-8 md:pb-0 bg-base-300 bg-[url("/src/assets/no-found-view.webp")] bg-cover bg-center'
    >
      <NavBarMinimal />
      <div className='flex items-center justify-center w-full h-full p-6'>
        <div className='mb-16 ml-0 shadow-xl card w-[500px]] h-[250px] bg-base-300/80 lg:ml-[520px]'>
          <div className='card-body'>
            <h1 className='text-4xl card-title'>404 - PAGE NOT FOUND</h1>
            <p className='text-base'>You have landed in the middle of nowhere.</p>
            <div className='justify-end card-actions'>
              <button onClick={() => navigate('/', { replace: true })} className='btn btn-primary'>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotFoundRedirect() {
  return <Navigate to='/' replace />;
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
