import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export function handleError(
    error: ErrorRequestHandler,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    console.error(error)
    response.status(500).send('Internal Server Error')
}
