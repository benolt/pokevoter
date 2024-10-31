import { UUID } from 'crypto'
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize'
import { sequelize } from './connect'

export class Profile extends Model<
    InferAttributes<Profile>,
    InferCreationAttributes<Profile>
> {
    declare id: UUID
    declare username: string
}

Profile.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'profile',
        timestamps: false,
    }
)

export class Vote extends Model<
    InferAttributes<Vote>,
    InferCreationAttributes<Vote>
> {
    declare id: CreationOptional<UUID>
    declare profile_id: UUID
    declare pokemon_id: UUID
    declare timestamp: CreationOptional<Date>
}

Vote.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        profile_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        pokemon_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'vote',
        timestamps: false,
    }
)

export class MyTopVote extends Model<
    InferAttributes<MyTopVote>,
    InferCreationAttributes<MyTopVote>
> {
    declare original_id: number
    declare name: string
    declare image_url: string
    declare vote_count: number
    declare latest_vote: Date
}

MyTopVote.init(
    {
        original_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        vote_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        latest_vote: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
)
