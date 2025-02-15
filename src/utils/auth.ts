import jwt from "jsonwebtoken";
import { User } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

interface DecodedToken {
  id: string;
  userName: string;
  role: string;
}

export const getUserFromToken = async (req: NextRequest) => {
  await dbConnect();

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const user = await User.findById(decoded.id).select("-password");
    return user;
  } catch (error) {
    return null;
  }
};
