import Game from './game.js'
import Actions from './actions.js'
import Player from './player.js'

const startButton = document.getElementById('start')

startButton.addEventListener('click', () => {
    const inputedName = document.getElementById('userinput')
    const userName = inputedName.value.trim()

    if (userName.length > 2) {
        const rounds = document.getElementById('rounds').value

        startGame(rounds, userName)

        const loginboard = document.getElementById('loginboard')
        const gameboard = document.getElementById('gameboard')

        loginboard.style.display = 'none'
        gameboard.style.display = 'grid'
    }
})

const startGame = (rounds, userName) => {
    const actions = new Actions()

    const player1 = new Player('Bot')
    const player2 = new Player(userName)

    const game = new Game(rounds, actions, [player1, player2])
    game.startGame()
}
