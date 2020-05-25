import json
class GameControllerFactory:
    
    def __init__(self,board,player,canClick):
        self.json = {
            "board" : board,
            "player" : player,
            "canClick" : canClick,
            "currentlySelected" : "",
            "movesMade" : []
        }
        
class PlayerFactory:
    def __init__(self,characters):
        self.json = {
            "characters" : characters
        }

class CharacterFactory:
    def __init__(self,name,movePoints,x,y,img="down0.png"):
        self.json = {
            "characterSheetPath" : "front_end/static/imgs/character_sheets/"+name,
            "facePath" : "front_end/static/imgs/faces/"+name+".jpeg",
            "movePoints" : movePoints,
            "x" : x,
            "y" : y,
            "img" : img,
            "moveTile" : 0
        }

class GameBoardFactory:
    def __init__(self,width,height):
        self.json = {
            "cellGrid" : [[CellFactory(x,y,100/width,100/height).json for y in range(height)] for x in range(width)]
        }

class CellFactory:
    def __init__(self,x,y,widthPercent,heightPercent,highlightColor=''):
        self.json = {
            "x" : x,
            "y" : y,
            "widthPercent" : widthPercent,
            "heightPercent" : heightPercent,
            "highlightColor" : highlightColor
        }