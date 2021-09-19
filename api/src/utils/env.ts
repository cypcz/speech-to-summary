interface IProcessEnv {
  DATABASE_URL: string;
  GCS_BUCKET_NAME: string;
  OPEN_AI_API_KEY: string;
  SESSION_SECRET: string;
  FE_ORIGIN: string;
  BE_ORIGIN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  NODE_ENV: "production" | "development";
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

const getEnvVars = () => {
  const requiredEnvs = [
    "DATABASE_URL",
    "GCS_BUCKET_NAME",
    "OPEN_AI_API_KEY",
    "SESSION_SECRET",
    "FE_ORIGIN",
    "BE_ORIGIN",
    "NODE_ENV",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
  ];

  const missingEnvVars = requiredEnvs.reduce((acc, envName) => {
    if (!process.env[envName]) {
      return acc !== "" ? `${acc}, ${envName}` : `${envName}`;
    }
    return acc;
  }, "");

  if (missingEnvVars.length) {
    throw new Error(
      `You are missing required environment variables: ${missingEnvVars}`
    );
  }

  return requiredEnvs.reduce(
    (acc, envName) => ({ ...acc, [envName]: process.env[envName] }),
    {} as IProcessEnv
  );
};

export const {
  DATABASE_URL,
  GCS_BUCKET_NAME,
  OPEN_AI_API_KEY,
  SESSION_SECRET,
  NODE_ENV,
  FE_ORIGIN,
  BE_ORIGIN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = getEnvVars();
