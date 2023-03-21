export enum HttpMethods {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export async function apiClient(method: HttpMethods, url = "") {
  // settin up the fetch api
  const response = await fetch(
    `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1${url}`,
    {
      method: method,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}
