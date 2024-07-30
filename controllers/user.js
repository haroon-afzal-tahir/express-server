export class UserController {
  static async getUser(req, res, next) {
    // res.status(500).send({ ...req.user })
    next()
  }

  static async updateUser(req, res) {
  }
}
