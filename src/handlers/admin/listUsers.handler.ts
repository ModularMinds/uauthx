import { Request, Response } from "express";
import { prisma } from "../../database";

export const listUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ isSuccess: true, users });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error });
  }
};
