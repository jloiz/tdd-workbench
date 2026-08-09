export class ScoreBoard {

    gameCoordinator;
    score;

    scoreMappings = {
        1: 40,
        2: 100,
        3: 300,
        4: 1200
    }

    constructor(gameCoordinator){
        this.gameCoordinator = gameCoordinator
        gameCoordinator.subscribe("numRowsCleared", numRows => {
            this.updateScore(numRows)
        })

        this.score = 0
    }

    updateScore(rowsCleared) {
        
    }

    getScore(){
        return this.score
    }

}