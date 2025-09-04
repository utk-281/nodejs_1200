import jwt from "jsonwebtoken";

export const generateJwtToken = (id, tokenVersion) => {
  console.log("id, tokenVersion: ", id, tokenVersion);
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};
