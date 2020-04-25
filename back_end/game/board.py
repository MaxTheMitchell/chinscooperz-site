class GameBoard:

    def __init__(self,width=10,height=10):
        self.cells = [[Cell('{},{}'.format(x,y)) for x in range(width)] for y in range(height)]
        
    def __repr__(self):
        return str(self.cells)

    def __str__(self):
        html = "<table>"
        for collum in self.cells:
            html += "<tr>\n"
            for row in collum:
                html += str(row)
            html += "</tr>"
        return html + "</table>"

    def clear_highting(self):
        [cell.clear_highting() for row in self.cells for cell in row]
    
    def highlight_cell_with_id(self,cell_id,color):
        self._access_cell_with_id(cell_id).highlight("red")

    def get_cell_value(self,cell_id):
        return self._access_cell(*self._parse_cell_id(cell_id)).get()

    def move(self,old_x,old_y,new_x,new_y):
        self.add(self.pop(old_x,old_y),new_x,new_y)

    def move_cell_with_id(self,old_id,new_id):
        self.move(*self._parse_cell_id(old_id),*self._parse_cell_id(new_id))

    def add(self,content,x,y):
        self._access_cell(x,y).fill(content)

    def pop(self,x,y):
        return self._access_cell(x,y).pop()

    def _access_cell_with_id(self,cell_id):
        return self._access_cell(*self._parse_cell_id(cell_id))

    def _access_cell(self,x,y):
        return self.cells[y][x]

    def _parse_cell_id(self,cell_id):
        return [int(axis) for axis in cell_id.split(',')]

class Cell:

    def __init__(self,my_id='',content='',highlight_color=''):
        self.content = content
        self.id = my_id
        self.highlight_color = highlight_color

    def __repr__(self):
        return "Cell{ "+str(self.content)+" }"

    def __str__(self):
        return """
            <td id = '{}'; onclick='gridClicked(this.id);' style='background-color:{};'>{}</td>
        """.format(self.id,self.highlight_color,self.content)

    def clear_highting(self):
        self.highlight_color = ''

    def highlight(self,color):
        self.highlight_color = color

    def fill(self,content):
        self.content = content

    def pop(self):
        old_content = self.content
        self.content = ''
        return old_content

    def get(self):
        return self.content