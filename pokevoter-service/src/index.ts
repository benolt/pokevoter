import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import helmet from 'helmet'

import { simpleAuth } from './middlewares/auth'
import { handleError } from './middlewares/error'
import v1PokemonRouter from './routes/v1/pokemon-routes'

dotenv.config()

const PORT = process.env.API_PORT || 9083

const app: Express = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(simpleAuth)

app.use('/api/v1/pokemon', v1PokemonRouter)

app.use(handleError)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
