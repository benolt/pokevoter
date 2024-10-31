export class NotFoundError extends Error {
    statusCode: number
    constructor(message: string | undefined) {
        super(message)
        this.name = 'NotFoundError'
        this.statusCode = 404
    }
}
