import { useNavigate } from 'react-router-dom';
import NavBarMinimal from '../Layout/NavBarMinimal';
import { Btn2 } from './Btn2';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      id='canvas'
      className='flex flex-col items-center w-full h-screen pb-8 md:pb-0 bg-base-300 bg-[url("/src/assets/no-found-view.webp")] bg-cover bg-center'
    >
      <NavBarMinimal />
      <div className='flex items-center justify-center w-full h-full p-6'>
        <div className='mb-16 ml-0 shadow-xl card w-[500px]] h-[250px] bg-base-300/80 lg:ml-[520px]'>
          <div className='card-body'>
            <h1 className='text-4xl card-title'>404 - PAGE NOT FOUND</h1>
            <p className='text-base'>You have landed in the middle of nowhere.</p>
            <div className='justify-end card-actions'>
              <Btn2 onClick={() => navigate('/', { replace: true })}>Go Home</Btn2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// References:
// -- https://stackoverflow.com/questions/72090838: Redirect and 404 method
