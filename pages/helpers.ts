export const getData = async <T>(url: string) => {
  try {
    const res = await fetch(url);
    const data: T[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};