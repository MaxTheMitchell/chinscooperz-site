class GameBoard:

    def __init__(self,width=10,height=10):
        self.cells = [['']*width for _ in range(height)]
        
    def get_html_rep(self):
        html = "<div class='game_board'>\n<table>\n"
        for collum in self.cells:
            html += "<tr>\n"
            for row in collum:
                html += "<td onclick='gridClicked();'>{}</td>\n".format(row)
            html += "</tr>\n"
        return html + "</table>\n<div>\n"

    def add_to_map(self,content,x,y):
        self.cells[y][x] = content