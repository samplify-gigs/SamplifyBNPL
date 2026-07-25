export async function iosFetch(url: string, options: RequestInit = {}) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const token = localStorage.getItem("login_jwt");
  const headers: Record<string, string> = {
    "content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (isIOS && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });
}
