// Use case: fetch and error handling within loader and action
export default async function fetchRes(url, method, body) {
  let requestOptions;
  switch (method) {
    case 'post':
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      };
      break;
    case 'get':
      requestOptions = {
        method: 'GET',
        credentials: 'include',
      };
      break;
    case 'patch':
      requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      };
      break;
    case 'delete':
      requestOptions = {
        method: 'DELETE',
        credentials: 'include',
      };
      break;
    default:
      requestOptions = {
        method: 'GET',
        credentials: 'include',
      };
  }

  const response = await fetch(url, requestOptions);
  // #region un-foldable
  // PS1 Verbose error handling using the response body constructed in the API endpoint; alternatively, simply throw
  //  `response.status` and/or `response.statusText` without parsing the response
  // PS2 Only handle errors represented by the network status code b/c they've been defined in the backend API and
  //  assigned with meaningful messages, handling (1) fetch API errors other than those indicated by the `Response`
  //  interface (e.g. `errorElement` can catch error like `Window.fetch: HEAD or GET Request cannot have a body`), (2)
  //  parsing JSON errors and (3) network errors if the server is down are delegated to and managed by React Router's
  //  `errorElement`, therefore:
  // NB No `catch` block nor `catch()` method has been used during handling fetch errors b/c React Router's
  //  `errorElement` will catch those errors, see `errorElement`'s spec
  // PS3 The most ideal way of handling fetch errors is to `throw new Response()`, then use the `error.data` to render
  //  the thrown response, which complies with React Router's specs – the `error` obj returned from the `useRouteError`
  //  Hook has a special shape (that can be observed by console logging) b/c the thrown response is tucked into a
  //  constructor called `ErrorResponse` (see: https://reactrouter.com/en/main/utils/is-route-error-response, which also
  //  explains why this is the most ideal way)
  // PS4 Alternatively, `throw new Error(<whatever>)`, then use `error.<whatever>` to render the thrown error, e.g.,
  //  `error.message`
  // TODO `AbortController` for fetch with cancel button UI in individual component (currently conflict w/ global
  //  pending UI)
  // #endregion
  if (!response?.ok) {
    const json = await response.json();
    const message = `${json.status} ${
      typeof json.message === 'string' ? json.message : json.message.map((issue) => issue.message).join('; ')
    }`;
    throw new Response(message);
  }
  // NB (1) "React Router will automatically call `response.json()` (within the loader) so components don't need to
  //  parse it while rendering", see: https://reactrouter.com/en/main/route/loader,
  //  (2) however, `Response` obj returned by this utility function `fetchRes.js` fails to be parsed in the loader,
  //  Error: `Uncaught (in promise) TypeError: Response.json: Body has already been consumed.` => Google error =>
  //  https://stackoverflow.com/questions/34786358/what-does-this-error-mean-uncaught-typeerror-already-read => Log and
  //  observe the `response` constant right before it's returned at the end of this utility => `Response.bodyUsed` is
  //  true => Solution: don't parse `Response` obj outside the scope of error handling (the if statement).
  return response;
}

// References for fetch API:
// -- https://jasonwatmore.com/post/2021/09/05/fetch-http-post-request-examples: Fetch - HTTP POST/PUT/PATCH/DELETE
//  Request Examples
// -- https://developer.mozilla.org/en-US/docs/Web/API/Response: `Response` interface, esp. its instance properties and
//  instance methods

// References for error handling in loader and action:
// -- https://javascript.info/async-await#error-handling: Fundamentals of error handling in `async` functions
// -- https://reactrouter.com/en/main/route/loader: Official recommended way of (1) parsing response, or lack thereof,
//  and (2) handling fetch errors in the loader, which leverages the `throw` statement (see:
//   https://javascript.info/async-await#error-handling)
// -- https://dmitripavlutin.com/javascript-fetch-async-await/#:~:text=3.-,Handling%20fetch%20errors,-When%20I%20was:
//  "Handling fetch errors" part, this guide (1) is in line with React Router's official recommended way of error
//  handling in that it leverages the `throw` statement (see: https://javascript.info/async-await#error-handling),
//  however, (2) use `throw new Error()` i/o `throw new Response()`, which is less ideal (see spec for
//  `isRouteErrorResponse` for reasons)
// -- https://web.dev/fetch-api-error-handling/: (1) Classification of fetch errors, (2) more detailed guide to
//  handling fetch errors, esp. the "When the network status code represents an error" part; (3) standardized naming
//  convention for parameters used during fetch error handling, which is in line with "React Docs – Reusing Logic
//  with Custom Hooks"

// References for React Router specs:
// -- https://reactrouter.com/en/main/route/error-element#throwing-responses: Spec for `errorElement`, specifically
//  throwing responses, covering everything mentioned the 2 links below
// -- https://reactrouter.com/en/main/hooks/use-route-error: Spec for `useRouteError`: "Note that thrown responses have
//  special treatment, see `isRouteErrorResponse` for more information."
// -- https://reactrouter.com/en/main/utils/is-route-error-response: Spec for `isRouteErrorResponse`: "When a response
//  is thrown from an action or loader, it will be unwrapped into an `ErrorResponse` (constructor) so that your
//  component doesn't have to deal with the complexity of unwrapping it (which would require React state and effects to
//  deal with the promise returned from `res.json()`)"
