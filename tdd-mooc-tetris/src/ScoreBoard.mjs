export class ScoreBoard {
    gameCoordinator;
    constructor(gameCoordinator){
        this.gameCoordinator = gameCoordinator

        gameCoordinator.subscribe("numRowsCleared", numRows => {
            this.updateScore(numRows)
        })
    }

    updateScore(rowsCleared) {
        console.log("LISTENING")
    }

}