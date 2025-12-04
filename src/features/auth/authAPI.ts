import CryptoJS from "crypto-js";
import { AuthCredentials } from "./authSlice";

export interface LoginRequest {
  username: string;
  hashedPassword: string;
}

export interface LogoutRequest {
  token: string;
}

export interface AuthApiResponse {
  result: string;
  token: string;
  error?: string;
}

export const login = async (credentials: AuthCredentials): Promise<AuthApiResponse> => {
  try {
    const hashedPassword = CryptoJS.MD5(credentials.password).toString();

    const response = await fetch("app/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        hashedPassword: hashedPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        result: "false",
        token: "",
        error: errorData.error || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      result: data.result,
      token: data.token,
      error: data.error,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      result: "false",
      token: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const logout = async (token: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch("app/user/logout", {
      method: "GET",
      headers: {
        AuthToken: `${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || `HTTP error! status: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during logout:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
