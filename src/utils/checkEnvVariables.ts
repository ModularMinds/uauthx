import { shutdownServer } from "./shutdownServer";

// Required env variables for the server
const requiredEnvVariables = [
  "UAUTHX_ADMIN",
  "UAUTHX_PASSWORD",
  "UAUTHX_PUBLIC_IP",
  "SECRET_KEY",
];

// Checking all required environment variables
export const checkEnvVariables = () => {
  // Checking if any required variable is missing or not
  let isAnyVariableMissing = false;
  requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
      console.log(`.env has missing variable ${variable}`);
      isAnyVariableMissing = true;
    }
  });

  // Shutting down the server if any variable is missing
  if (isAnyVariableMissing) shutdownServer();
  // Giving a green signal to this inspection if everything is found perfect
  else console.log("All required environment variables are set");
};
