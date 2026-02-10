import instance from "./axios";

export interface HelpMessageRequest {
  message: string;
}

export interface HelpMessageResponse {
  success: boolean;
  data: {
    message: string;
    timestamp: string;
  };
}

/**
 * Send a message to the help center AI assistant
 * POST /api/helpCenter/ai/assistant (DeepSeek AI)
 */
export const sendHelpMessage = async (
  request: HelpMessageRequest
): Promise<{ message: string }> => {
  const response = await instance.post<HelpMessageResponse>("/helpCenter/ai/assistant", {
    message: request.message,
  });
  // axios interceptor returns response.data directly, so response is already the HelpMessageResponse object
  const data = response as unknown as HelpMessageResponse;
  return {
    message: data.data.message,
  };
};
