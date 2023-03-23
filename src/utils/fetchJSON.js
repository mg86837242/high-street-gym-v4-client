// Use case: fetch and error handling in loader and action
export default async function fetchJSON(url, method, body) {
  let requestOptions;
  switch (method) {
    case "post":
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      };
      break;
    case "get":
      requestOptions = {
        method: "GET",
        credentials: "include",
      };
      break;
    case "patch":
      requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      };
      break;
    case "delete":
      requestOptions = {
        method: "DELETE",
        credentials: "include",
      };
      break;
    default:
      requestOptions = {
        method: "GET",
        credentials: "include",
      };
  }

  const response = await fetch(url, requestOptions);
  const json = await response.json();
  if (!response?.ok) {
    const message = `${json.status} ${typeof json.message === "string" ? json.message : json.message.map((issue) => issue.message).join("; ")}`;
    throw new Response(message);
  }

  return json;
}
