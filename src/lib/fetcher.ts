/**
|--------------------------------------------------
| Generic fetcher for all HTTP methods
|--------------------------------------------------
*/
type FetchOptions<T = unknown> = {
	body?: T;
	headers?: HeadersInit;
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

export const fetcher = async <TResponse, TRequest = unknown>(
	url: string,
	options: FetchOptions<TRequest> = {}
): Promise<TResponse> => {
	/**
    |--------------------------------------------------
    | Extracting the options
    |--------------------------------------------------
    */
	const { method = 'GET', body, headers } = options;

	/**
    |--------------------------------------------------
    | Api call with the provided options
    |--------------------------------------------------
    */
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers,

			/**
			|--------------------------------------------------
			| Authorization token
			|--------------------------------------------------
			*/
			authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
		},
		body: method !== 'GET' ? JSON.stringify(body) : undefined,
	});

	/**
    |--------------------------------------------------
    | Handles errors if any
    |--------------------------------------------------
    */
	if (!res.ok) {
		const error = await res.text();
		throw new Error(error || 'Something went wrong');
	}

	/**
    |--------------------------------------------------
    | Returns the response
    |--------------------------------------------------
    */
	return res.json();
};
