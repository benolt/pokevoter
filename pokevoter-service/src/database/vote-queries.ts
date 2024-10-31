import { sequelize } from './connect'
import { MyTopVote } from './vote-models'

const myTopVotesQuery = `SELECT p.original_id, p.name, p.image_url, p.cry_sound, COUNT(v.id) as vote_count, MAX(v.timestamp) as latest_vote
FROM vote v
INNER JOIN pokemon p ON v.pokemon_id = p.id
INNER JOIN profile u ON v.profile_id = u.id
WHERE u.username = :username
GROUP BY p.original_id, p.name, p.image_url, p.cry_sound
ORDER BY vote_count DESC, latest_vote ASC
LIMIT 10;`

export const getMyTopVotes = async (username: string): Promise<MyTopVote[]> => {
    const myTopVotes = await sequelize.query(myTopVotesQuery, {
        replacements: { username },
        model: MyTopVote,
        mapToModel: true,
    })

    return myTopVotes
}
