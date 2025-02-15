interface FetchOptions extends RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: string;
  includeCredentials?: boolean;
}

const baseUrl = import.meta.env.VITE_API_URL;

const _fetch = async (
  url: string,
  options: FetchOptions = {
    includeCredentials: false,
  }
) => {
  const token = localStorage.getItem("token");

  const baseHeaders: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (options.includeCredentials) {
    if (token) {
      baseHeaders["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("No token found");
    }
  }

  if (!options.headers) {
    options.headers = {};
  }

  Object.assign(options.headers, baseHeaders);

  return await fetch(`${baseUrl}${url}`, options).then(
    async (response: Response) => {
      if (!response.ok) {
        if (response.status === 401) {
          const error = await response.json().catch(() => null);

          if (error?.message === "Unauthorized") {
            localStorage.removeItem("token");
          }
        }

        const errorText = await response.json();
        throw new Error(errorText.message);
      }

      return response.json();
    }
  );
};
export default _fetch;
