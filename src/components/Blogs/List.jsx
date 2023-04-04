import { useContext, useState, useMemo } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Link, useLoaderData } from 'react-router-dom';
import { getDateNotation } from '../../utils/mapDates';
import Button2Sm from '../UI/Button2Sm';

export default function List() {
  const { authenticatedUser } = useContext(AuthContext);
  const { blogs } = useLoaderData();
  const [filter, setFilter] = useState('all');
  const allBlogList = useMemo(
    () =>
      blogs?.length ? (
        <>
          {blogs.map(({ id, title, body, createdAt, updatedAt, username }) => (
            <div key={id} className='mb-12 border border-base-content rounded-3xl'>
              <div className='flex'>
                <div className='w-full px-4 py-2 flex-shrink'>
                  <h4 className='text-[13px] leading-4 font-medium pb-2'>{username}</h4>
                  <Link to={`id/${id}`}>
                    <h2 className='text-primary-content md:text-[22px] md:leading-7 font-bold'>{title}</h2>
                    <h3 className='text-base leading-5 h-10 overflow-hidden text-ellipsis pt-1'>{body}</h3>
                  </Link>
                  <p className='text-[13px] leading-5 pt-2 italic'>Created at: {getDateNotation(createdAt)}</p>
                  {updatedAt && (
                    <p className='text-[13px] leading-5 italic'>Updated at: {getDateNotation(updatedAt)}</p>
                  )}
                </div>
                <Link to={`id/${id}`} className='w-[200px] flex-shrink-0'>
                  <img
                    src={`https://picsum.photos/200/156?random=${id}`}
                    alt='Random blog picture'
                    className='object-contain rounded-e-3xl'
                  />
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className='text-center my-4'>No blog has been found</p>
      ),
    [blogs]
  );
  const myBlogList = useMemo(() => {
    const hasMyBlog = blogs.find(({ loginId }) => loginId === authenticatedUser?.id);
    return hasMyBlog ? (
      <>
        {blogs.map(
          ({ id, title, body, loginId, createdAt, updatedAt, username }) =>
            loginId === authenticatedUser?.id && (
              <div key={id} className='mb-12 border border-base-content rounded-3xl'>
                <div className='flex'>
                  <div className='w-full px-4 py-2 flex-shrink'>
                    <h4 className='text-[13px] leading-4 font-medium pb-2'>{username}</h4>
                    <Link to={`id/${id}`}>
                      <h2 className='text-primary-content md:text-[22px] md:leading-7 font-bold'>{title}</h2>
                      <h3 className='text-base leading-5 h-10 overflow-hidden text-ellipsis pt-1'>{body}</h3>
                    </Link>
                    <p className='text-[13px] leading-5 pt-2 italic'>Created at: {getDateNotation(createdAt)}</p>
                    {updatedAt && (
                      <p className='text-[13px] leading-5 italic'>Updated at: {getDateNotation(updatedAt)}</p>
                    )}
                  </div>
                  <Link to={`id/${id}`} className='w-[200px] flex-shrink-0'>
                    <img
                      src={`https://picsum.photos/200/156?random=${id}`}
                      alt='Random blog picture'
                      className='object-contain rounded-e-3xl'
                    />
                  </Link>
                </div>
              </div>
            )
        )}
      </>
    ) : (
      <p className='text-center my-4'>No blog has been found</p>
    );
  }, [blogs, authenticatedUser]);

  return (
    <div className='flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-0'>
      <section className='lg:hidden'>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label='Dropdown list for filtering blogs'
          className='select select-primary select-sm w-full max-w-xs'
        >
          <option value='all'>All bookings</option>
          <option value='my'>My bookings</option>
        </select>
      </section>
      <section className='lg:col-[1_/_8]'>
        <div>{filter === 'all' ? allBlogList : myBlogList}</div>
      </section>
      <aside className='hidden lg:block lg:col-[9_/_13]'>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='select select-primary select-sm w-full max-w-xs'
        >
          <option value='all'>All bookings</option>
          <option value='my'>My bookings</option>
        </select>
        <div className='divider'></div>
        <Button2Sm w={'w-full'}>Create New</Button2Sm>
      </aside>
    </div>
  );
}
