import { connect } from "mongoose";

export const connectToDatabase = async () => {
  try {
    await connect(
      `mongodb://${process.env.UAUTHX_PUBLIC_IP}:${process.env.MONGODB_EXPOSE_PORT}/${process.env.MONGODB_NAME}`
    );
    console.log("connected to database successfully");
  } catch (error) {
    console.log(error);
  }
};
