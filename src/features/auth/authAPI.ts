import CryptoJS from "crypto-js";
import { AuthCredentials } from "./authSlice";

export interface LoginRequest {
  username: string;
  hashedPassword: string;
}

export interface LogoutRequest {
  token: string;
}

export interface AuthResponse {
  result: string;
  token: string;
}

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  try {
    const hashedPassword = CryptoJS.MD5(credentials.password).toString();

    const response = await fetch("api/user/login", {
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
        result: errorData.result || `HTTP error! status: ${response.status}`,
        token: "",
      };
    }

    const data = await response.json();
    return {
      result: data.result,
      token: data.token,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      result: error instanceof Error ? error.message : "Unknown error occurred",
      token: "",
    };
  }
};

export const logout = async (token: string): Promise<{ result?: string; success: boolean }> => {
  try {
    const response = await fetch("api/user/logout", {
      method: "GET",
      headers: {
        AuthToken: `${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        result: errorData.result || `HTTP error! status: ${response.status}`,
        success: false,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during logout:", error);
    return {
      result: error instanceof Error ? error.message : "Unknown error occurred",
      success: false,
    };
  }
};
