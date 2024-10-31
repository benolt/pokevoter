export function getCurrentUserId() {
    const userId = localStorage.getItem('pokeuserid')
    if (!userId) {
        const newUserId = generateUserId()
        localStorage.setItem('pokeuserid', newUserId)
        return newUserId
    }
    return userId
}

export function setUserId(userId: string) {
    localStorage.setItem('pokeuserid', userId)
}

function generateUserId() {
    const adjectives = ['Fiery', 'Electric', 'Mystic', 'Swift', 'Brave']
    const pokemons = ['Pikachu', 'Charizard', 'Mewtwo', 'Bulbasaur', 'Squirtle']

    const randomAdjective =
        adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)]
    const randomNumber = Math.floor(Math.random() * 1000000)

    return `${randomAdjective}${randomPokemon}${randomNumber}`
}
