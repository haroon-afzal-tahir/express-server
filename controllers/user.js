export class UserController {
  static async getUser(req, res) {
    res.send({ ...req.user })
  }

  static async updateUser(req, res) {
  }
}
