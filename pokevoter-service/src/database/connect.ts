import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const USER = process.env.POSTGRES_USER
const PASSWORD = process.env.POSTGRES_PASSWORD
const HOST = process.env.POSTGRES_HOST
const PORT = process.env.POSTGRES_PORT
const DATABASE = process.env.POSTGRES_DB

export const sequelize = new Sequelize(
    `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`,
    {
        define: {
            freezeTableName: true,
            timestamps: false,
        },
    }
)
