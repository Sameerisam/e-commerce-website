export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const connection = (await import("@/services/db/connection")).default;
    await connection();
  }
}
