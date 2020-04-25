from functools import reduce
class dialogueGenerator:

    def __init__(self,img_path='',color_finder={}):
        self.img_path = img_path
        self.color_finder = color_finder

    def get_html(self,text):
        return '<div class="textbox_container">'+reduce(
            lambda total,new: total + self.make_text_box(*new.strip().split('{')),
            text.split('}')[0:-1],''
            )+'</div>'
            
    def make_text_box(self,name,text):
        return """
            <div class="textbox" style="background-color: {}; op">
                <table>
                <tr>
                    <td>
                        <img src="{}/{}.jpg">
                    <td>
                    <td>   
                        <p>{}</p>
                    </td>
                </tr>
            </table>
            </div>
            """.format(self.color_finder[name],self.img_path,name,text)
