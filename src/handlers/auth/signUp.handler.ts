import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { prisma } from "../../database";

// Sign up request handler
export const signUp = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  try {
    console.log("/auth/sign-up api called");

    // Checking if already the given email exists is database or not
    const userExists = await prisma.findUnique({
      where: { email: req.body.email },
    });

    // Throwing 409 Conflict error if the email is already found in database
    if (userExists) {
      res.status(409).json({
        isSuccess: false,
        error: `User with email id - ${req.body.email} already exists`,
      });
      return;
    }

    // If email does not exists then storing it in database
    const createdUser = await prisma.user.create({ data: req.body });

    // Creating a payload
    const payload = { userId: createdUser._id };

    // Generating auth token
    const authToken = sign(payload, process.env.SECRET_KEY!);

    res.json({ isSuccess: true, authToken });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error });
  }
};
