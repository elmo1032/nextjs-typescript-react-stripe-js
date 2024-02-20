// This function exports an async function named fetchGetJSON which takes in a URL as a string and an optional parameter g.
// It is used to fetch data from a given URL and return the result as JSON.
export async function fetchGetJSON(url: string, g) {
  try {
    // The fetch function is used to make a request to the URL. The response is then converted to JSON format.
    const data = await fetch(url).then((res) => res.json());
    // The resolved data is returned.
    return data;
  } catch (err) {
    // If there's an error, a new Error object is thrown with the error message.
    throw new Error(err.message);
  }
}

// This function exports an async function named fetchPostJSON which takes in a URL as a string and an optional data object.
// It is used to send a POST request to the given URL with the provided data and return the response as JSON.
export async function fetchPostJSON(url: string, data = {}) {
  try {
    // Default options for the fetch request are defined here.
    const response = await fetch(url, {
      method: 'POST', // The request method is set to POST.
      mode: 'cors', // The mode is set to cors to allow cross-origin requests.
      cache: 'no-cache', // The cache is set to no-cache to prevent using a cached response.
      credentials: 'same-origin', // The credentials are set to same-origin to send cookies only to the same origin.
      headers: {
        'Content-Type': 'application/json', // The Content-Type header is set to application/json to indicate JSON data.
      },
      redirect: 'follow', // The redirect policy is set to follow to automatically follow redirects.
      referrerPolicy: 'no-referrer', // The referrer policy is set to no-referrer to send no referrer information.
      body: JSON.stringify(data), // The request body is set to the JSON-stringified data object.
    });
    // The response is converted to JSON format and returned.
    return await response.json();
  }
