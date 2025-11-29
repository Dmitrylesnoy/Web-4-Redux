export interface FormData {
  x: number;
  y: number;
  r: number;
  graphFlag?: boolean;
}

export interface ServerResponse {
  x?: number;
  y?: number;
  r?: number;
  hit?: boolean;
  execTime?: number;
  date?: string;
  error?: string;
}

export const submitFormData = async (formData: FormData): Promise<ServerResponse> => {
  try {
    const response = await fetch("api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x: formData.x,
        y: formData.y,
        r: formData.r,
        graph: "false",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: (errorData.error || "") + `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
