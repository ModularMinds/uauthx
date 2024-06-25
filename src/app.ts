import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { rootRouter } from "./routers";
import { connectToDatabase } from "./database";

import { checkEnvVariables } from "./utils/checkEnvVariables";

import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

config();

const app = express();

app.use(cors());
app.use(express.json());

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.1.0",

    basePath: "http://localhost:5000",

    schemes: ["Hello ", "1", "2"],

    tags: [{ name: "Authentication", description: "Sample tag desc" }],

    host: "http://localhost:5000",

    swagger: "aojvoja",

    consumes: ["aojrg", "oav"],

    externalDocs: {
      url:""
    },

    produces:["fg", "fg"],

    info: {
      title: "UAuthX API Docs",
      version: "1.0.0",
      contact: {
        email: "tanmayvaij22@gmail.com",
        name: "Tanmay Vaij",
        url: "https://www.github.com/tanmayvaij"
      },
      description:
        "This is an interactive api documentation for uauthx authentication micro-service",
      license: {
        name: "MIT",
        url: "",
      },
      termsOfService: "",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "",
      },
    ],

    paths: {
      "/auth/sign-up": {
        post: {
          summary: "User sign up",
          tags: ["Authentication"],

          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "johndoe@example.com",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      example: "Strong_Password@123",
                    },
                  },
                },
              },
            },
          },

          responses: {
            "200": {
              description: "",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSucess: {
                        type: "boolean",
                        example: "true",
                      },
                      authToken: {
                        type: "string",
                        example: "<your-auth-token>",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/auth/sign-in": {
        post: {
          tags: ["Authentication"],
        },
      },
    },
  },

  apis: [],
};

app.use("/api-docs", serve, setup(swaggerJSDoc(options)));

app.use("/", rootRouter);

const startServer = async () => {
  try {
    checkEnvVariables();
    await connectToDatabase();

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
