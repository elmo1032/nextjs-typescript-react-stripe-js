export async function fetchGetJSON(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchPostJSON(url: string, data?: {}): Promise<any> {
  try {
    const defaultOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    };

    const response = await fetch(url, defaultOptions);
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    throw new Error(err.message);
  }
}
