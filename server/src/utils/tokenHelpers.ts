// `generateToken` function that generates a JSON Web Token (JWT) for a given user ID. It uses the `jsonwebtoken` library to create the token, which is signed with a secret key defined in the environment variables. The token is set to expire in 7 days. If the secret key is not defined, an error is thrown.

import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const payload = { userId };

  const token = jwt.sign(payload, secret, { expiresIn: "7d" });

  return token;
};