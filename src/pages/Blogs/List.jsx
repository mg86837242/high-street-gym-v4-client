import { useContext, useState, useMemo } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, Link, Form } from 'react-router-dom';
import removeTags from '../../helpers/removeTags';
import { getDateNotation } from '../../helpers/mapDates';
import { Btn2Sm } from '../../components/ui/Btn2';
import { LinkBtn2Sm } from '../../components/ui/LinkBtn2';

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
                <div className='flex-shrink w-full px-4 py-2'>
                  <h4 className='pb-2 font-medium leading-4 text-[13px]'>{username}</h4>
                  <Link to={`${id}`}>
                    <h2 className='text-base font-bold leading-5 text-accent md:text-[22px] md:leading-7'>{title}</h2>
                    <h3 className='hidden h-10 pt-1 overflow-hidden text-base leading-5 md:block text-ellipsis'>
                      {removeTags(body)}
                    </h3>
                  </Link>
                  <p className='pt-2 italic leading-5 text-[13px]'>Created at: {getDateNotation(createdAt)}</p>
                  {updatedAt && (
                    <p className='italic leading-5 text-[13px]'>Updated at: {getDateNotation(updatedAt)}</p>
                  )}
                </div>
                <Link to={`${id}`} className='flex-shrink-0 w-[200px]'>
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
        <p className='my-4 text-center'>No blog has been found</p>
      ),
    [blogs]
  );
  // BUG Filter is not working as intended
  const myBlogList = useMemo(() => {
    const hasMyBlog = blogs.some(({ loginId }) => loginId === authenticatedUser?.id);
    return hasMyBlog ? (
      <>
        {blogs.map(
          ({ id, title, body, loginId, createdAt, updatedAt, username }) =>
            loginId === authenticatedUser?.id && (
              <div key={id} className='mb-12 border border-base-content rounded-3xl'>
                <div className='flex'>
                  <div className='flex-shrink w-full px-4 py-2'>
                    <h4 className='pb-2 font-medium leading-4 text-[13px]'>{username}</h4>
                    <Link to={`${id}`}>
                      <h2 className='text-base font-bold leading-5 text-primary-content md:text-[22px] md:leading-7'>
                        {title}
                      </h2>
                      <h3 className='hidden h-10 pt-1 overflow-hidden text-base leading-5 md:block text-ellipsis'>
                        {removeTags(body)}
                      </h3>
                    </Link>
                    <p className='pt-2 italic leading-5 text-[13px]'>Created at: {getDateNotation(createdAt)}</p>
                    {updatedAt && (
                      <p className='italic leading-5 text-[13px]'>Updated at: {getDateNotation(updatedAt)}</p>
                    )}
                  </div>
                  <Link to={`${id}`} className='flex-shrink-0 w-[200px]'>
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
      <p className='my-4 text-center'>No blog has been found</p>
    );
  }, [blogs, authenticatedUser]);

  return (
    <div className='flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-0'>
      <section className='lg:hidden'>
        {authenticatedUser ? (
          <>
            <Form method='post' action='new'>
              <input type='hidden' name='loginId' value={authenticatedUser?.id} />
              <Btn2Sm w='w-full'>Create New</Btn2Sm>
            </Form>
            <div className='divider'></div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              aria-label='Dropdown list for filtering blogs'
              className='w-full max-w-xs select select-primary select-sm'
            >
              <option value='all'>All bookings</option>
              <option value='my'>My bookings</option>
            </select>
          </>
        ) : (
          <LinkBtn2Sm to='/login' w='w-full'>
            Log in to Create Blog
          </LinkBtn2Sm>
        )}
      </section>
      <section className='lg:col-[1_/_8]'>
        <div>{filter === 'all' ? allBlogList : myBlogList}</div>
      </section>
      <aside className='hidden lg:block lg:col-[9_/_13]'>
        {authenticatedUser ? (
          <>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className='w-full max-w-xs select select-primary select-sm'
            >
              <option value='all'>All bookings</option>
              <option value='my'>My bookings</option>
            </select>
            <div className='divider'></div>
            <Form method='post' action='new'>
              <input type='hidden' name='loginId' value={authenticatedUser?.id} />
              <Btn2Sm w='w-full'>Create New</Btn2Sm>
            </Form>
          </>
        ) : (
          <LinkBtn2Sm to='/login' w='w-full'>
            Log in to Create Blog
          </LinkBtn2Sm>
        )}
      </aside>
    </div>
  );
}
