class Player{

    constructor(characters=[]){
        this.characters = characters
    }
    
    display(){
        return this.characters.reduce((total,character)=>
            {return total+character.displayPanel()},"")
    }

    preloadCharacters(){
        return this.characters.reduce((total,addon)=>{return total+addon.preload()},"")
    }

    hasCharacterAt(x,y){
        return this.characters.some(character=>(character.x===x && character.y === y))
    }

}