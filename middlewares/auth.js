export class AuthMiddleware {
  static async verify(req, res, next) {
    try {
      const authorization = req.headers["Authorization"] || req.headers["authorization"]

      if (!authorization) {
        return res.status(401).send({ message: "Authorization header is missing" })
      }
      
      if (authorization && authorization !== "random_secret_key") {
        return res.status(401).send({ message: "Unauthorized" })
      }

      next();
    } catch (error) {
      res.status(500).send({
        message: error.message || error
      })
    }
  }
}
