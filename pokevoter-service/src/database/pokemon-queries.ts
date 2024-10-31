import { Op } from 'sequelize'
import { Pokemon } from './pokemon-models'

export const getPokemonsByIds = async (pokemon_ids: number[]) => {
    const pokemons = await Pokemon.findAll({
        attributes: [
            ['original_id', 'id'],
            'name',
            'height',
            'weight',
            'species',
            'image_url',
            'cry_sound',
        ],
        where: {
            original_id: {
                [Op.in]: pokemon_ids,
            },
        },
        include: [
            {
                all: true,
                attributes: [['original_id', 'id'], 'name'],
                through: { attributes: [] },
            },
        ],
    })

    return pokemons
}
