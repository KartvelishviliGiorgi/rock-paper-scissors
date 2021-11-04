class Player {
    #name = ''
    #points = 0
    #winningState = false

    constructor(name) {
        this.#name = name
    }

    get getPlayerName() {
        return this.#name
    }

    set setPlayerName(value) {
        this.#name = value
    }

    get getPlayerPoints() {
        return this.#points
    }

    set setPlayerPoints(value) {
        this.#points = value
    }

    get getWinningState() {
        return this.#winningState
    }

    set setWinningState(state) {
        if (typeof state === 'boolean') {
            this.#winningState = state
        } else {
            this.#winningState = false
        }
    }
}

export default Player
