from functools import reduce
class dialogueGenerator:

    def __init__(self,img_path=''):
        self.img_path = img_path

    def get_html(self,text):
        return reduce(
            lambda total,new: total + self.make_text_box(*new.strip().split('{')),
            text.split('}')[0:-1],'')
            
    def make_text_box(self,name,text):
        return """
            <table class="textbox" style="background-color: aqua;">
            <tr>
                <td>
                    <img src="{}/{}.png">
                <td>
                <td>   
                    <p>{}</p>
                </td>
            </tr>
            </table>
            """.format(self.img_path,name,text)
