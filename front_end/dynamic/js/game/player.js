class Player{

    constructor(characters=[]){
        this.characters = characters
    }
    
    display(){
        return this.characters.reduce((total,addon)=>{return total+addon},"")
    }

    preloadCharacters(){
        return this.characters.reduce((total,addon)=>{return total+addon.preload()},"")
    }

}