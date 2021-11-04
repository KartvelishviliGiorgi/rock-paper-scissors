class GUI {
    createActionButton = (
        actionId,
        actionName,
        startCallback,
        resultCallback
    ) => {
        const actionsBoard = document.getElementById('actions-board')

        const button = document.createElement('button')
        button.innerText = actionName
        button.id = actionId
        button.classList.add('action-button')
        button.onclick = () =>
            this.#startImgsAnimation(startCallback, resultCallback)

        actionsBoard.appendChild(button)
    }

    deleteActionButtons = () => {
        const actionsBoard = document.getElementById('actions-board')

        actionsBoard.innerHTML = ''
    }

    #startImgsAnimation = (startCallback, resultCallback) => {
        const botImg = document.getElementById('user-img-0')
        const userImg = document.getElementById('user-img-1')

        const imgs = [botImg, userImg]

        imgs.forEach((img, key) => {
            img.addEventListener('animationend', () =>
                this.#clearImgAnimation(img)
            )
            img.style.animation = 'shake 1s ease'

            startCallback()

            setTimeout(() => {
                img.removeEventListener('animationend', () =>
                    this.#clearImgAnimation(img)
                )

                if (key) resultCallback()
            }, 1200)
        })
    }

    #clearImgAnimation = (img) => {
        img.style.animation = ''
    }

    updatePLayerNameText(playerId, name) {
        const element = document.getElementById(`user-name-${playerId}`)

        element.innerText = name
    }

    updatePlayerPointsText(playerId, points) {
        const element = document.getElementById(`user-points-${playerId}`)

        element.innerText = points
    }

    updatePlayerActionImg = (playerId, action) => {
        const element = document.getElementById(`user-img-${playerId}`)

        element.src = `./imgs/${action}.png`
    }

    updateComplationText = (text) => {
        const element = document.getElementById('complation-text')

        element.innerText = text
    }

    loadLoginBoard = () => {
        const loginboard = document.getElementById('loginboard')
        const gameboard = document.getElementById('gameboard')

        loginboard.style.display = 'block'
        gameboard.style.display = 'none'
    }
}

export default GUI
