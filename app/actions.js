class Actions {
    static #ACTION_ROCK = 'rock'
    static #ACTION_PAPER = 'paper'
    static #ACTION_SCISSORS = 'scissors'

    get getDefaultAction() {
        return Actions.#ACTION_ROCK
    }

    get getActionsList() {
        return [
            Actions.#ACTION_ROCK,
            Actions.#ACTION_PAPER,
            Actions.#ACTION_SCISSORS,
        ]
    }

    get getRandomAction() {
        const actions = this.getActionsList

        const randomNumber = Math.random() * this.getActionsList.length
        const result = Math.floor(randomNumber)

        return result < 3 ? actions[result] : actions[2]
    }

    getActionAbilities = (action) => {
        switch (action) {
            case Actions.#ACTION_ROCK: {
                return {
                    winnerAction: Actions.#ACTION_PAPER,
                    defeatedAction: Actions.#ACTION_SCISSORS,
                }
            }

            case Actions.#ACTION_PAPER: {
                return {
                    winnerAction: Actions.#ACTION_SCISSORS,
                    defeatedAction: Actions.#ACTION_ROCK,
                }
            }

            case Actions.#ACTION_SCISSORS: {
                return {
                    winnerAction: Actions.#ACTION_ROCK,
                    defeatedAction: Actions.#ACTION_PAPER,
                }
            }

            default:
                return null
        }
    }
}

export default Actions
