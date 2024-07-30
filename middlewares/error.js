import express from 'express';

export class ErrorMiddleware {
  /**
   * 
   * @param {express.ErrorRequestHandler} err 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next
   * @returns 
   */
  static async errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }
}
