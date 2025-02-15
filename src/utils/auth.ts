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
  try {
    console.log("🔹 Connecting to the database...");
    await dbConnect();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ No Authorization header found");
      return null;
    }

    const token = authHeader.split(" ")[1];
    console.log("🔹 Extracted Token:", token);

    if (!process.env.JWT_SECRET) {
      console.error("❌ Missing JWT_SECRET in environment variables");
      return null;
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
      console.log("✅ Decoded Token:", decoded);
    } catch (error) {
      console.error("❌ Invalid Token:", error);
      return null;
    }

    if (!decoded?.id) {
      console.error("❌ Decoded token does not contain a valid ID");
      return null;
    }

    console.log("📨 Fetching user from database...");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.error("❌ No user found with ID:", decoded.id);
      return null;
    }

    console.log(`✅ User Authenticated: ${user.userName} (ID: ${user._id})`);
    return user;
  } catch (error) {
    console.error("❌ ERROR in getUserFromToken:", error);
    return null;
  }
};
