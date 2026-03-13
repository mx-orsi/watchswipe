const isTestEnvFlag =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_TEST_MODE === "true";

export const TEST_MODE =
  process.env.NODE_ENV !== "production" && Boolean(isTestEnvFlag);

