export class ShuffleBag{
    
    contents;
    currentPosition;
    
    fill(items){
        this.contents = items
        this.currentPosition = items.length
    }

    pull(){
        let newItem = this.contents[this.currentPosition]
        this.currentPosition--;
        return this.contents[this.currentPosition]
    }

}