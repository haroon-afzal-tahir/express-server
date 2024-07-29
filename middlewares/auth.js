import jwt from "jsonwebtoken";

export class AuthMiddleware {
  static async verify(req, res, next) {
    try {
      const authorization = req.headers["Authorization"] || req.headers["authorization"]

      if (!authorization || authorization.split(" ")[0] !== "Bearer") {
        return res.status(401).send({ message: "Authorization header is missing" })
      }

      const token = authorization.split(" ")[1]

      if (!token) {
        return res.status(401).send({ message: "Token is missing" })
      }

      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = user;

      next();
    } catch (error) {
      res.status(500).send({
        message: error.message || error
      })
    }
  }
}
