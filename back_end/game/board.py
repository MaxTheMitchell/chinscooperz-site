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

    def move(self,old_x,old_y,new_x,new_y):
        self.add(self.pop(old_x,old_y),new_x,new_y)

    def add(self,content,x,y):
        self._access_cell(x,y).set(content)

    def pop(self,x,y):
        return self._access_cell(x,y).pop()

    def _access_cell(self,x,y):
        return self.cells[y][x]

class Cell:

    def __init__(self,content=''):
        self.content = content

    def __repr__(self):
        return self.content

    def __str__(self):
        return "<td id = '{}'; onclick='gridClicked(this.id);'>{}</td>".format(id(self),self.content)

    def set(self,content):
        self.content = content

    def pop(self):
        old_content = self.content
        self.content = ''
        return old_content

    def get(self):
        return self.content
