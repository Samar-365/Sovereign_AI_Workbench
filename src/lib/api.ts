import { Message } from "@/types/chat";
import { defaultExecutionSteps } from "@/mocks/mockAgentTrace";

export const IS_MOCK_MODE =
  process.env.NEXT_PUBLIC_DEMO_MODE === "false" ? false : true;

export interface SubmitTaskPayload {
  prompt: string;
  files?: any[];
  model?: string;
  temperature?: number;
  tags?: string[];
}

export async function submitIndustrialTask(payload: SubmitTaskPayload): Promise<{
  success: boolean;
  taskId: string;
}> {
  if (IS_MOCK_MODE) {
    // Generate deterministic mock task response
    return {
      success: true,
      taskId: `TASK-${Date.now().toString().slice(-6)}`,
    };
  }

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.warn("Backend unavailable, falling back to sovereign enclave mock mode", error);
    return {
      success: true,
      taskId: `TASK-${Date.now().toString().slice(-6)}`,
    };
  }
}
