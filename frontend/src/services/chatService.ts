import { getAccessToken } from "@/services/authService";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

type ChatApiResponse = {
  response: string;
};

async function parseError(
  response: Response
): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data.detail === "string") {
      return data.detail;
    }

    return "Nova is temporarily unavailable.";
  } catch {
    return "Nova is temporarily unavailable.";
  }
}

export async function sendChatMessage(
  message: string
): Promise<string> {
  const token = getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  const response = await fetch(
    `${API_URL}/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      await parseError(response)
    );
  }

  const data =
    (await response.json()) as ChatApiResponse;

  return data.response;
}