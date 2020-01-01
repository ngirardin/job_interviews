const doFetch = async (url: string, method: string, body?: string): Promise<Response> => {
  const options = {
    body: ["POST", "PUT"].includes(method) ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json"
    },
    method: method
  };
  const response = await fetch(url, options);
  return response;
};

const query = async <T>(url: string, method: string, body?: any): Promise<T> => {
  const response = await doFetch(url, method, body);
  const json = await response.json();
  return json as T;
};

const queryNoResponse = async (url: string, method: string, body?: any): Promise<void> => {
  const response = await doFetch(url, method, body);
  const text = await response.text();
  return;
};

export default {
  get: async <T>(url: string): Promise<T> => query<T>(url, "GET"),
  post: async <T>(url: string, body?: any): Promise<T> => query<T>(url, "POST", body),
  postWithoutResponse: async (url: string, body?: any): Promise<void> => queryNoResponse(url, "POST", body),
  put: async <T>(url: string, body: any): Promise<T> => query(url, "PUT", body)
};
