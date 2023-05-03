import { useNavigate } from 'react-router-dom';
import NavBarMinimal from '../layouts/NavBarMinimal';
import { Btn2 } from './Btn2';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      id='canvas'
      className='flex h-screen w-full flex-col items-center bg-base-300 bg-[url("/src/assets/not-found.webp")] bg-cover bg-center pb-8 md:pb-0'
    >
      <NavBarMinimal />
      <div className='flex h-full w-full items-center justify-center p-6'>
        <div className='w-[500px]] card mb-16 ml-0 h-[250px] bg-base-300/80 shadow-xl lg:ml-[520px]'>
          <div className='card-body'>
            <h1 className='card-title text-4xl'>404 - PAGE NOT FOUND</h1>
            <p className='text-base'>You have landed in the middle of nowhere.</p>
            <div className='card-actions justify-end'>
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
