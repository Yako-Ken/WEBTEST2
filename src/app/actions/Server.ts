import { URLSearchParams } from "url";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export const fetchData = async ({
  resourceName,
  method = "GET",
  body,
  id,
  queryParams,
  cache = "no-cache",
  revalidate,
  tags,
}: {
  resourceName: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  id?: string;
  queryParams?: URLSearchParams;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
} ) => {
  let urlString = `${API_URL}/${resourceName}`;
  if (id) {
    urlString += `/${id}`;
  }
  if (queryParams) {
    urlString += `?${queryParams.toString()}`;
  }

  try {
    const res = await fetch(urlString, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next: {
        revalidate,
        tags,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({
        message: `Request failed with status: ${res.status}`,
      }));
      throw new Error(errorBody.message || "An unknown error occurred");
    }

    const text = await res.text();
    if (!text) {
      return { success: true, message: "Operation successful, no content returned." };
    }
    
    return JSON.parse(text);

  } catch (error: any) {
    console.error(`Error fetching ${resourceName}:`, error.message);
    throw error;
  }
};
