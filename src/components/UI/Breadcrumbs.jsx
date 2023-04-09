import { useMatches } from 'react-router-dom';

export default function Breadcrumbs() {
  let matches = useMatches();
  let crumbs = matches
    .filter(match => Boolean(match.handle?.crumb))
    // NB The following line is mapping each `match` obj to its `crumb` method, which returns a render function and is
    //  defined in the `RouterContext` in a way that the shape of arguments passed into the method here is dependent on
    //  the shape of arguments defined in the `RouterContext`
    .map(({ handle, params, data }) => handle.crumb(params, data));
  // Alternatively:
  // .map((match) => match.handle.crumb(match.params, match.data));

  return (
    <div className='text-sm breadcrumbs'>
      <ul>
        {crumbs.map((crumb, i) => (
          <li key={i}>{crumb}</li>
        ))}
      </ul>
    </div>
  );
}
