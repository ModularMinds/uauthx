import { Request, Response } from "express";
import { User } from "../../models";

export const listUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    res.json({ isSuccess: true, users });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error });
  }
};
