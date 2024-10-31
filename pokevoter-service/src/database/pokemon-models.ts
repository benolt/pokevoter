import { UUID } from 'crypto'
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize'
import { sequelize } from './connect'

export class Pokemon extends Model<
    InferAttributes<Pokemon>,
    InferCreationAttributes<Pokemon>
> {
    declare id: UUID
    declare original_id: number
    declare name: string
    declare height: number
    declare weight: number
    declare species: string
    declare image_url: string
    declare cry_sound: string
}

Pokemon.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        original_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        species: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cry_sound: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'pokemon',
        timestamps: false,
    }
)

const columns = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    original_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}

export const Ability = sequelize.define(
    'ability',
    {
        ...columns,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

export const Form = sequelize.define(
    'form',
    {
        ...columns,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

export const HeldItem = sequelize.define(
    'held_item',
    {
        ...columns,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

export const Move = sequelize.define(
    'move',
    {
        ...columns,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

export const Type = sequelize.define(
    'type',
    {
        ...columns,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

const PokemonAbility = sequelize.define(
    'pokemon_ability',
    {
        pokemon_id: {
            type: DataTypes.UUID,
            references: {
                model: Pokemon,
                key: 'id',
            },
        },
        ability_id: {
            type: DataTypes.UUID,
            references: {
                model: Ability,
                key: 'id',
            },
        },
    },
    { timestamps: false }
)

const PokemonForm = sequelize.define(
    'pokemon_form',
    {
        pokemon_id: {
            type: DataTypes.UUID,
            references: {
                model: Pokemon,
                key: 'id',
            },
        },
        form_id: {
            type: DataTypes.UUID,
            references: {
                model: Form,
                key: 'id',
            },
        },
    },
    { timestamps: false }
)

const PokemonHeldItem = sequelize.define(
    'pokemon_held_item',
    {
        pokemon_id: {
            type: DataTypes.UUID,
            references: {
                model: Pokemon,
                key: 'id',
            },
        },
        held_item_id: {
            type: DataTypes.UUID,
            references: {
                model: HeldItem,
                key: 'id',
            },
        },
    },
    { timestamps: false }
)

const PokemonMove = sequelize.define(
    'pokemon_move',
    {
        pokemon_id: {
            type: DataTypes.UUID,
            references: {
                model: Pokemon,
                key: 'id',
            },
        },
        move_id: {
            type: DataTypes.UUID,
            references: {
                model: Move,
                key: 'id',
            },
        },
    },
    { timestamps: false }
)

const PokemonType = sequelize.define(
    'pokemon_type',
    {
        pokemon_id: {
            type: DataTypes.UUID,
            references: {
                model: Pokemon,
                key: 'id',
            },
        },
        type_id: {
            type: DataTypes.UUID,
            references: {
                model: Type,
                key: 'id',
            },
        },
    },
    { timestamps: false }
)

Pokemon.belongsToMany(Ability, {
    through: PokemonAbility,
    foreignKey: 'pokemon_id',
})
Ability.belongsToMany(Pokemon, {
    through: PokemonAbility,
    foreignKey: 'ability_id',
})
Pokemon.belongsToMany(Form, { through: PokemonForm, foreignKey: 'pokemon_id' })
Form.belongsToMany(Pokemon, { through: PokemonForm, foreignKey: 'form_id' })
Pokemon.belongsToMany(HeldItem, {
    through: PokemonHeldItem,
    foreignKey: 'pokemon_id',
})
HeldItem.belongsToMany(Pokemon, {
    through: PokemonHeldItem,
    foreignKey: 'held_item_id',
})
Pokemon.belongsToMany(Move, { through: PokemonMove, foreignKey: 'pokemon_id' })
Move.belongsToMany(Pokemon, { through: PokemonMove, foreignKey: 'move_id' })
Pokemon.belongsToMany(Type, { through: PokemonType, foreignKey: 'pokemon_id' })
Type.belongsToMany(Pokemon, { through: PokemonType, foreignKey: 'type_id' })
