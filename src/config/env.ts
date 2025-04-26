export const env = {
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
};

for (const [key, value] of Object.entries(env)) {
  if (value === "") {
    throw new Error(`${key} not found in ENV`);
  }
}
