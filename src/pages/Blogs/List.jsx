import { useContext, useMemo,useState } from 'react';
import { Link, useFetcher, useLoaderData, useLocation } from 'react-router-dom';

import { Btn1Sm } from '../../components/ui/Btn1';
import { LinkBtn1Sm } from '../../components/ui/LinkBtn1';
import { AuthContext } from '../../context/AuthContext';
import { getDateNotation } from '../../helpers/mapDates';
import removeTags from '../../helpers/removeTags';

export default function List() {
  const auth = useContext(AuthContext);
  const { blogs } = useLoaderData();
  const [filter, setFilter] = useState('all');
  const fetcher = useFetcher();
  const location = useLocation();
  const allBlogList = useMemo(
    () =>
      blogs?.length ? (
        <>
          {blogs.map(({ id, title, body, createdAt, updatedAt, username }) => (
            <div key={id} className='mb-12 rounded-3xl border border-base-content'>
              <div className='flex'>
                <div className='w-full flex-shrink px-4 py-2'>
                  <h4 className='pb-2 text-[13px] font-medium leading-4'>{username}</h4>
                  <Link to={`${id}`}>
                    <h2 className='text-base font-bold leading-5 text-accent md:text-[22px] md:leading-7'>{title}</h2>
                    <h3 className='hidden h-10 overflow-hidden text-ellipsis pt-1 text-base leading-5 md:block'>
                      {removeTags(body)}
                    </h3>
                  </Link>
                  <p className='pt-2 text-[13px] italic leading-5'>Created at: {getDateNotation(createdAt)}</p>
                  {updatedAt && (
                    <p className='text-[13px] italic leading-5'>Updated at: {getDateNotation(updatedAt)}</p>
                  )}
                </div>
                <Link to={`${id}`} className='w-[200px] flex-shrink-0'>
                  <img
                    src={`https://picsum.photos/200/156?random=${id}`}
                    alt='Random blog picture'
                    className='rounded-e-3xl object-contain'
                  />
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className='my-4 text-center'>No blog has been found</p>
      ),
    [blogs],
  );
  const myBlogList = useMemo(() => {
    const hasMyBlog = blogs.some(({ loginId }) => loginId === auth.user?.id);
    return hasMyBlog ? (
      <>
        {blogs.map(
          ({ id, title, body, loginId, createdAt, updatedAt, username }) =>
            loginId === auth.user?.id && (
              <div key={id} className='mb-12 rounded-3xl border border-base-content'>
                <div className='flex'>
                  <div className='w-full flex-shrink px-4 py-2'>
                    <h4 className='pb-2 text-[13px] font-medium leading-4'>{username}</h4>
                    <Link to={`${id}`}>
                      <h2 className='text-base font-bold leading-5 text-primary-content md:text-[22px] md:leading-7'>
                        {title}
                      </h2>
                      <h3 className='hidden h-10 overflow-hidden text-ellipsis pt-1 text-base leading-5 md:block'>
                        {removeTags(body)}
                      </h3>
                    </Link>
                    <p className='pt-2 text-[13px] italic leading-5'>Created at: {getDateNotation(createdAt)}</p>
                    {updatedAt && (
                      <p className='text-[13px] italic leading-5'>Updated at: {getDateNotation(updatedAt)}</p>
                    )}
                  </div>
                  <Link to={`${id}`} className='w-[200px] flex-shrink-0'>
                    <img
                      src={`https://picsum.photos/200/156?random=${id}`}
                      alt='Random blog picture'
                      className='rounded-e-3xl object-contain'
                    />
                  </Link>
                </div>
              </div>
            ),
        )}
      </>
    ) : (
      <p className='my-4 text-center'>No blog has been found</p>
    );
  }, [blogs, auth.user]);

  return (
    <div className='flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-0'>
      <section className='lg:hidden'>
        {auth.user ? (
          <>
            <fetcher.Form method='post' action='new'>
              <input type='hidden' name='loginId' value={auth.user?.id} />
              <Btn1Sm w='w-full'>Create New</Btn1Sm>
            </fetcher.Form>
            <div className='divider'></div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              aria-label='Dropdown list for filtering blogs'
              className='select select-primary select-sm w-full max-w-xs'
            >
              <option value='all'>All bookings</option>
              <option value='my'>My bookings</option>
            </select>
          </>
        ) : (
          <LinkBtn1Sm to='/login' state={{ from: location }} replace={true} w='w-full'>
            Log in to Create Blog
          </LinkBtn1Sm>
        )}
      </section>
      <section className='lg:col-[1_/_8]'>
        <div>{filter === 'all' ? allBlogList : myBlogList}</div>
      </section>
      <aside className='hidden lg:col-[9_/_13] lg:block'>
        {auth.user ? (
          <>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className='select select-primary select-sm w-full max-w-xs'
            >
              <option value='all'>All bookings</option>
              <option value='my'>My bookings</option>
            </select>
            <div className='divider'></div>
            <fetcher.Form method='post' action='new'>
              <input type='hidden' name='loginId' value={auth.user?.id} />
              <Btn1Sm w='w-full'>Create New</Btn1Sm>
            </fetcher.Form>
          </>
        ) : (
          <LinkBtn1Sm to='/login' state={{ from: location }} replace={true} w='w-full'>
            Log in to Create Blog
          </LinkBtn1Sm>
        )}
      </aside>
    </div>
  );
}
