import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function List() {
  const { blogs } = useLoaderData();
  const allBlogList = useMemo(() => {
    blogs?.length ? (
      <h1>Hello</h1>
    ) : (
      //   <ul>
      //     {blogs.map((b, i) => (
      //       <li key={i}>
      //         <p>123</p>
      //         <p>{b.id}</p>
      //       </li>
      //     ))}
      //   </ul>
      <p className='text-center mt-4'>No blog has been found</p>
    );
  }, [blogs]);

  console.log('🟢');
  console.log(allBlogList);
  console.log('🟢');

  return <>{allBlogList}</>;
}
