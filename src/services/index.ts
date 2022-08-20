export async function fetchData<T>(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (response.status !== 200) {
    throw {
      message: data?.message ?? 'Something get wrong!',
      status: response.status,
    };
  }

  return data as T;
}
