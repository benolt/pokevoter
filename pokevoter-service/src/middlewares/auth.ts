import { NextFunction, Request, Response } from 'express'
import '../types/express'

export function simpleAuth(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const username = request.header('X-Username')

    if (!username) {
        response.status(401).send('Unauthorized: No username provided')
        return
    }

    if (username.length > 100) {
        response
            .status(400)
            .send('Bad Request: Username is longer than 100 characters')
        return
    }

    request.username = username
    next()
}
