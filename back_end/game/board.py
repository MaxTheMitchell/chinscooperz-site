class GameBoard:

    def __init__(self,width=10,height=10):
        self.cell_grid = [[Cell(x,y) for x in range(width)] for y in range(height)]
        
    def __repr__(self):
        return str(self.cell_grid)

    def __str__(self):
        html = "<table>"
        for collum in self.cell_grid:
            html += "<tr>\n"
            for row in collum:
                html += str(row)
            html += "</tr>"
        return html + "</table>"

    def get_cells_in_range_of(self,cell_id,cell_range):
        return list(filter(
            lambda cell : self._cell_is_in_range_of_other_cell(
                self._access_cell_with_id(cell_id),cell,cell_range),
            self._get_all_cells()
            )
        )

    def clear_highting(self):
        for cell in self._get_all_cells():
            cell.clear_highting() 
    
    def highlight_cell_with_id(self,cell_id,color):
        self._access_cell_with_id(cell_id).highlight(color)

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

    def _cell_is_in_range_of_other_cell(self,cell,other_cell,cell_range):
        return (abs(cell.x - other_cell.x) + abs(cell.y - other_cell.y)) <= cell_range

    def _access_cell_with_id(self,cell_id):
        return self._access_cell(*self._parse_cell_id(cell_id))

    def _access_cell(self,x,y):
        return self.cell_grid[y][x]

    def _parse_cell_id(self,cell_id):
        return [int(axis) for axis in cell_id.split(',')]

    def _get_all_cells(self):
        return [cell for row in self.cell_grid for cell in row]

class Cell:

    def __init__(self,x,y,content='',highlight_color=''):
        self.content = content
        self.x = x
        self.y = y
        self.highlight_color = highlight_color

    def __repr__(self):
        return "Cell{ "+str(self.content)+" }"

    def __str__(self):
        return """
            <td id = '{}'; onclick='gridClicked(this.id);' style='background-color:{};'>{}</td>
        """.format(self._get_id_str(),self.highlight_color,self.content)

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
    
    def _get_id_str(self):
        return '{},{}'.format(self.x,self.y)