from functools import reduce
class DialogueGenerator:

    def __init__(self,img_path=''):
        self.img_path = img_path

    def get_html(self,text):
        return '<div class="textbox_container">'+reduce(
            lambda total,new: total + self.make_text_box(
                *new.strip().split('{')),
                text.split('}')[0:-1],'')+'</div>'
            
    def make_text_box(self,name,text):
        return """
            <div class="textbox {}">
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
            """.format(name,self.img_path,name,text)
