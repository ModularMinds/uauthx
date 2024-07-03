import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { Express } from "express";

interface PathOptions {
  [endpoint: string]: {
    post?: {
      summary?: string;
      tags?: string[];

      requestBody?: {
        required?: boolean;
      };
    };
  };
}

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.1.0",

    tags: [
      {
        name: "Authentication",
        description: "Sample tag desc",
      },
      {
        name: "Admin",
        description: "",
      },
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

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        basicAuth: {
          type: "http",
          scheme: "basic",
        },
      },
    },

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
          summary: "User sign in",
          tags: ["Authentication"],

          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      example: "johndoe@example.com",
                    },
                    password: {
                      type: "string",
                      example: "Strong_password@123",
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
                      isSuccess: {
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

            "400": {
              description: "",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSuccess: {
                        type: "boolean",
                        example: "false",
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

            "401": {
              description: "",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSuccess: {
                        type: "boolean",
                        example: "false",
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

      "/verify-user": {
        get: {
          summary: "Verify User",
          description: "Verifies the user based on the provided JWT token.",
          tags: ["Authentication"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            "200": {
              description: "User successfully verified",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSuccess: {
                        type: "boolean",
                        example: true,
                      },
                      userId: {
                        type: "string",
                        example: "12345",
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - Token not provided or invalid",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSucess: {
                        type: "boolean",
                        example: false,
                      },
                      message: {
                        type: "string",
                        example: "Token not provided",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
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
                        example: "Error message",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/admin/list-users": {
        get: {
          tags: ["Admin"],
          summary: "List users",
          security: [
            {
              basicAuth: [],
            },
          ],
          description:
            "An endpoint to list users, accessible only by admin with basic authentication",
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSuccess: {
                        type: "boolean",
                      },
                      users: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            username: {
                              type: "string",
                            },
                            // Add other user properties as necessary
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Authorization token not found in the headers",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSuccess: {
                        type: "boolean",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            "403": {
              description: "Invalid admin credentials",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSuccess: {
                        type: "boolean",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      isSuccess: {
                        type: "boolean",
                      },
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  apis: [],
};

export const startSwagger = (app: Express) => {
  app.use("/api-docs", serve, setup(swaggerJSDoc(options)));
};
