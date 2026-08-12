export class ShuffleBag{
    
    contents;
    
    fill(items){
        this.contents = items
    }

    pull(){
        return this.contents[0]
    }

}