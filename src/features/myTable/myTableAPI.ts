import { PointData } from "./myTableSlice";

export interface ServerResponse {
  data?: PointData[];
  error?: string;
}

export const fetchPointsData = async (): Promise<ServerResponse> => {
  try {
    const response = await fetch("api/form", { method: "GET" });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: (errorData.error || "") + `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { data: data };
  } catch (error) {
    console.error("Error data fetch:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
