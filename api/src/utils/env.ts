interface IProcessEnv {
  DATABASE_URL: string;
  GCS_BUCKET_NAME: string;
  OPEN_AI_API_KEY: string;
  SESSION_SECRET: string;
  SESSION_ORIGIN: string;
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
    "SESSION_ORIGIN",
    "NODE_ENV",
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
  SESSION_ORIGIN,
} = getEnvVars();
