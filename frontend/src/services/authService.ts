import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  TokenResponse,
} from "@/types/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

const TOKEN_KEY = "cliniverse-access-token";


async function parseError(
  response: Response
): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data.detail === "string") {
      return data.detail;
    }

    return "Something went wrong.";
  } catch {
    return "Something went wrong.";
  }
}


export async function registerUser(
  payload: RegisterPayload
): Promise<AuthUser> {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}


export async function loginUser(
  payload: LoginPayload
): Promise<TokenResponse> {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}


export async function getCurrentUser(
  token: string
): Promise<AuthUser> {
  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Your session is invalid or has expired."
    );
  }

  return response.json();
}


export function saveAccessToken(
  token: string
) {
  window.localStorage.setItem(
    TOKEN_KEY,
    token
  );
}


export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(
    TOKEN_KEY
  );
}


export function removeAccessToken() {
  window.localStorage.removeItem(
    TOKEN_KEY
  );
}