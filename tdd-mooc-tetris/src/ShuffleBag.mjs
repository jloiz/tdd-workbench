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
        console.log(this.currentPosition)
        let newItem = this.contents[this.currentPosition]
        console.log(newItem)
        this.currentPosition--;
        return newItem
    }

}