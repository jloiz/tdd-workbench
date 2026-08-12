export class ShuffleBag{
    
    contents;
    currentPosition;
    
    fill(items){
        this.contents = items
        this.currentPosition = items.length - 1
    }

    pull(){
        if (this.currentPosition < 0) {
            this.currentPosition = this.contents.length - 1
        }

        let randPosition = this.getRandomInt(this.currentPosition)

        let currentItem = this.contents[randPosition]
        this.contents[randPosition] = this.contents[this.currentPosition]
        this.contents[this.currentPosition] = currentItem
        this.currentPosition--;

        return currentItem
    }
    
    getRandomInt(max){
        return Math.floor(Math.random() * max)
    }

}