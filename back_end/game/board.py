class GameBoard:

    def __init__(self,width=10,height=10):
        self.cells = [['']*width for _ in range(height)]
        
    def get_html_rep(self):
        html = "<table class=game_board>\n"
        for collum in self.cells:
            html += "<tr>"
            for row in collum:
                html += "<td>{}</td>\n".format(row)
            html += "</tr>\n"
        return html + "</table>\n"

    def add_to_map(self,content,x,y):
        self.cells[y][x] = content