interface IProcessEnv {
  GCS_BUCKET_NAME: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

const getEnvVars = () => {
  const requiredEnvs = ["GCS_BUCKET_NAME"];

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

export const { GCS_BUCKET_NAME } = getEnvVars();
