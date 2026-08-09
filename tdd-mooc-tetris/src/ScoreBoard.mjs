export class ScoreBoard {

    gameCoordinator;
    score;

    constructor(gameCoordinator){
        this.gameCoordinator = gameCoordinator
        gameCoordinator.subscribe("numRowsCleared", numRows => {
            this.updateScore(numRows)
        })

        this.score = 0
    }

    updateScore(rowsCleared) {
        console.log("LISTENING")
    }

    getScore(){
        return this.score
    }

}