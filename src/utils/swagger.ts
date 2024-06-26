import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.1.0",

    tags: [
        {  
            name: "Authentication", 
            description: "Sample tag desc" 
        }
    ],

    info: {
      title: "UAuthX API Docs",
      version: "1.0.0",
      contact: {
        email: "tanmayvaij22@gmail.com",
        name: "Tanmay Vaij",
        url: "https://www.github.com/tanmayvaij",
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

            "409": {
              description: "",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSuccess: {
                        type: "boolean",
                        example: false,
                      },
                      error: {
                        type: "string",
                        example: "Invalid username or password",
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

export const startSwagger = (app: Express) => {
  app.use("/api-docs", serve, setup(swaggerJSDoc(options)));
};


interface P {
    "200": {
        
    }
}