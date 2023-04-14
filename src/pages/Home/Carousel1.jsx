import { useRef } from 'react';
import carouselItems from '../../data/carouselItems';

export default function Carousel() {
  const listRef = useRef(null);

  function scrollToIndex(index) {
    const listNode = listRef.current;
    const slideNode = listNode.querySelectorAll('li > div')[index];
    slideNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  return (
    <>
      <nav className='flex justify-center gap-10 py-2 bg-base-100 w-full'>
        {carouselItems.map(
          ({ id, activityName }) =>
            id > 3 && (
              <button
                key={id}
                onClick={() => scrollToIndex(id - 4)}
                className='btn btn-secondary shadow shadow-black/50'
              >
                {activityName.replace('-', ' ')}
              </button>
            )
        )}
      </nav>
      {/* NB Bug: `<li>` elements not sitting in one line => Google "no wrap element" => Solution: https://stackoverflow.com/questions/718891/how-to-make-a-div-not-wrap */}
      <ul ref={listRef} className='whitespace-nowrap w-full overflow-x-hidden'>
        {carouselItems.map(
          ({ id, activityName, imageUrl }) =>
            id > 3 && (
              <li id={`slide-${id + 1}`} key={id} className='inline-block'>
                <div id={`slide-${id + 1}-content-wrapper`} className='grid grid-cols-2 place-items-center'>
                  <img
                    src={imageUrl}
                    alt={`${activityName} activities`}
                    className='col-span-2 lg:col-span-1 w-full h-full object-cover object-center rounded-3xl transition-all duration-5000 hover:rounded-md grayscale'
                  />
                  <div className='col-span-2 lg:col-span-1 text-center whitespace-normal p-4 lg:p-6'>
                    <h2 className='mb-6'>{`${activityName.replace('-', ' ')} Activities`}</h2>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem est cupiditate suscipit non
                      ipsa voluptatibus error culpa debitis quaerat. Incidunt?
                    </p>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </>
  );
}

// References: https://react.dev/reference/react/useRef#manipulating-the-dom-with-a-ref
