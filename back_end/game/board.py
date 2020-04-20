class GameBoard:

    def __init__(self,width=10,height=10):
        self.cells = [[Cell() for _ in range(width)] for _ in range(height)]
        
    def __str__(self):
        html = "<table>"
        for collum in self.cells:
            html += "<tr>\n"
            for row in collum:
                html += str(row)
            html += "</tr>"
        return html + "</table>"

    def add_to_map(self,content,x,y):
        self.cells[y][x].set_content(content)

class Cell:

    def __init__(self,content=''):
        self.content = content

    def __repr__(self):
        return self.content

    def __str__(self):
        return "<td id = '{}'; onclick='gridClicked(this.id);'>{}</td>".format(id(self),self.content)

    def set_content(self,content):
        self.content = content
