import { useMemo } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getDateNotation } from '../../utils/mapDates';

export default function List() {
  const { blogs } = useLoaderData();
  const allBlogList = useMemo(
    () =>
      blogs?.length ? (
        <>
          {blogs.map(({ id, title, body, username, createdAt, updatedAt }, i) => (
            <div key={i} className='mb-12 border border-base-content rounded-3xl'>
              <div className='flex'>
                <div className='w-full px-4 py-2 flex-shrink'>
                  <h4 className='text-[13px] leading-4 font-medium pb-2'>{username}</h4>
                  <Link to={`id/${id}`}>
                    <h2 className='text-primary-content md:text-[22px] md:leading-7 font-bold'>{title}</h2>
                    <h3 className='text-base leading-5 h-10 overflow-hidden text-ellipsis pt-1'>{body}</h3>
                  </Link>
                  <p className='text-[13px] leading-5 pt-2'>Created at: {getDateNotation(createdAt)}</p>
                  {updatedAt && <p className='text-[13px] leading-5'>Updated at: {getDateNotation(updatedAt)}</p>}
                </div>
                <Link to={`id/${id}`} className='w-[200px] flex-shrink-0'>
                  <img
                    src={`https://picsum.photos/200/156?random=${i}`}
                    alt='Random blog picture'
                    className='object-contain rounded-3xl'
                  />
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className='text-center mt-4'>No blog has been found</p>
      ),
    [blogs]
  );

  return (
    <div className='grid grid-cols-12'>
      <section className='col-[1_/_8]'>
        <div className='py-3'>{allBlogList}</div>
      </section>
      <aside className='col-[9_/_13]'>
        <h1>aside column</h1>
      </aside>
    </div>
  );
}
