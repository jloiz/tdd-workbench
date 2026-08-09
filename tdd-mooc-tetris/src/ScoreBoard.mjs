export class ScoreBoard {

    gameCoordinator;
    score;
    scoreMappings;
    level;



    constructor(gameCoordinator) {
        this.gameCoordinator = gameCoordinator
        gameCoordinator.subscribe("numRowsCleared", numRows => {
            this.updateScore(numRows)
        })

        this.score = 0
        this.level = 1

        this.scoreMappings = {
            1: 40,
            2: 100,
            3: 300,
            4: 1200
        }
    }

    updateScore(rowsCleared) {
        this.score += this.scoreMappings[rowsCleared]*this.level
    }

    getScore() {
        return this.score
    }

}