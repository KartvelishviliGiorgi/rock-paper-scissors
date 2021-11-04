import GUI from './gui.js'

class Game extends GUI {
    #botActions = []

    constructor(rounds, actions, players) {
        super()

        this.rounds = rounds
        this.actions = actions
        this.players = players
    }

    startGame = () => {
        this.players.forEach((player, key) => {
            this.updatePLayerNameText(key, player.getPlayerName)
            this.updatePlayerPointsText(key, player.getPlayerPoints)
            this.updatePlayerActionImg(key, this.actions.getDefaultAction)
            this.updateComplationText('')
        })

        this.actions.getActionsList.forEach((action, key) => {
            this.createActionButton(
                key,
                action,
                () => this.#actionStart(),
                () => this.#actionResult(action)
            )
        })
    }

    endGame = (winnerId) => {
        this.deleteActionButtons()

        if (winnerId) {
            this.updateComplationText('You won the game')
        } else {
            this.updateComplationText('You lost the game')
        }

        setTimeout(() => {
            this.loadLoginBoard()
        }, 2500)
    }

    #actionStart = () => {
        this.players.forEach((player, key) => {
            this.updatePlayerActionImg(key, this.actions.getDefaultAction)
        })
    }

    #actionResult = (action) => {
        const players = []

        this.players.forEach((player, key) => {
            let playerObj = {
                id: key,
                type: 'user',
                action: action,
                player: player,
            }

            let resultAction = action

            if (!key) {
                const randomAction = this.actions.getRandomAction
                const modifiedAction = this.#checkBotAction(randomAction)

                if (modifiedAction !== null) {
                    resultAction = modifiedAction
                } else {
                    resultAction = randomAction
                }

                playerObj.type = 'bot'
                playerObj.action = resultAction
            }

            players.push(playerObj)

            this.updatePlayerActionImg(key, resultAction)
        })

        this.#checkRoundWinner(players)
        this.#checkGameWinner()
    }

    #checkRoundWinner = (players) => {
        const bot = players.find((element) => element.type === 'bot')
        const user = players.find((element) => element.type === 'user')

        const userAction = user.action

        const actionAbilities = this.actions.getActionAbilities(userAction)

        if (bot.action === actionAbilities.winnerAction) {
            const updatedPoints = bot.player.getPlayerPoints + 1
            bot.player.setPlayerPoints = updatedPoints
            this.updatePlayerPointsText(bot.id, updatedPoints)
        }
        if (bot.action === actionAbilities.defeatedAction) {
            const updatedPoints = user.player.getPlayerPoints + 1
            user.player.setPlayerPoints = updatedPoints
            this.updatePlayerPointsText(user.id, updatedPoints)
        }
    }

    #checkBotAction = (action) => {
        let coincidence = 0
        let resultAction = null

        this.#botActions.push(action)

        const actionsLength = this.#botActions.length

        if (actionsLength > 2) {
            for (let i = 0; i < actionsLength - 1; i++) {
                if (this.#botActions[i] === action) coincidence++
            }

            this.#botActions = [this.#botActions[1], action]
        }

        if (coincidence >= 2) {
            while (true) {
                const randomAction = this.actions.getRandomAction

                if (randomAction !== action) {
                    resultAction = randomAction
                    break
                }
            }
        }

        return resultAction
    }

    #checkGameWinner = () => {
        this.players.forEach((player, playerId) => {
            if (player.getPlayerPoints >= this.rounds) {
                this.endGame(playerId)
            }
        })
    }
}

export default Game
