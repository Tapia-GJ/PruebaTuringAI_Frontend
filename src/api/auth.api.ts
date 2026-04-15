import type { Session } from "../types/auth.types";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const AUTH_BASE = `${API_BASE}/api/auth`;

export async function fetchSession(): Promise<Session | null> {
  try {
    const res = await fetch(`${AUTH_BASE}/session`, {
      credentials: "include",
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch session:", error);
    return null;
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<Session> {
  const res = await fetch(`${AUTH_BASE}/sign-in/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Invalid credentials");
  }

  return await res.json();
}

export async function signUp(
  email: string,
  name: string,
  password: string,
): Promise<Session> {
  const res = await fetch(`${AUTH_BASE}/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }

  return await res.json();
}

export async function signOut(): Promise<void> {
  try {
    await fetch(`${AUTH_BASE}/sign-out`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Failed to sign out:", error);
  }
}
