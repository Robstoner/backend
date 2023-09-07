import jwt from "jsonwebtoken";

export function generateToken(email: string) {
  return jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_EXPIRATION_TIME),
  });
}
