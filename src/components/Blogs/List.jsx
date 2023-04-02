import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function List() {
  const { blogs } = useLoaderData();
  const allBlogList = useMemo(
    () =>
      blogs?.length ? (
        <ul>
          {blogs.map((b, i) => (
            <li key={i}>
              <p>{b.id}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center mt-4'>No blog has been found</p>
      ),
    [blogs]
  );

  return <div>{allBlogList}</div>;
}
