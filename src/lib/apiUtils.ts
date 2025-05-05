export async function safeApiCall<T>(
  fn: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(`[${context}]:`, error);
    throw error;
  }
}
