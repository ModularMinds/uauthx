import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../database";

// Sign in request handler
export const signIn = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  try {
    // Checking if the user with given email exists or not
    const userExist = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    // Throwing 404 not found error if user does not exist
    if (!userExist) {
      res
        .status(404)
        .json({ isSuccess: false, error: "Invalid username or password" });
      return;
    }

    // Comparing the passwords
    const passwordMatched = await compare(
      req.body.password.trim(),
      userExist.password
    );

    // Throwing 401 error if passwords not match
    if (!passwordMatched) {
      res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
      return;
    }

    // Creating a payload
    const payload = { userId: userExist._id };

    // Generating auth token
    const authToken = sign(payload, process.env.SECRET_KEY!);

    res.json({ isSuccess: true, authToken });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error });
  }
};
