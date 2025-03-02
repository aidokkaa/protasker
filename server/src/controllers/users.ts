import { Request, Response,RequestHandler } from "express";
import { getAllUsers,getUser } from "../models/users"; 

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("failed to get list of users:", error);

    res.status(500).json({
      success: false,
      message: "failed to get list of users",
    });
  }
};
export const getUserController: RequestHandler = async (req, res) => {
  try {
    const userid = req.params.id;
    if (!userid) {
      res.status(400).json({ message: "User ID is required" });
      return; 
    }

    const user = await getUser(Number(userid));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error with getting user!", err);
    res.status(500).json({ message: "Internal server error" });
  }
};