import http.server,re
from back_end import dialogueGenerator,htmlFactory

class MyHandlers(http.server.SimpleHTTPRequestHandler):

    ROOT_PATH = "./front_end/static"
    HTML_PATH = ROOT_PATH+"/html"
    HTML_FAC = htmlFactory.htmlFac(
        open(HTML_PATH + "/head.html").read(),
        open(HTML_PATH + "/header.html").read(),
        open(HTML_PATH + "/footer.html").read()
    )
    DIALOG_GEN = dialogueGenerator.dialogueGenerator("/front_end/static/imgs")

    def do_GET(self):
        if self._is_root(self.path):
            return self._root_resp()
        elif self._is_dialogue(self.path):
            return self._dialogue_resp(self.path)
        return super().do_GET()

    def _is_root(self,path):
        return path == "/"

    def _root_resp(self):
        return self._custom_get_resp(
            self.HTML_FAC.get_html_bytes(open(self.HTML_PATH+"/index.html").read())
        )

    def _is_dialogue(self,path):
        return re.match('^/dialogue/.*',self.path)

    def _dialogue_resp(self,path):
        return self._custom_get_resp(
            self.HTML_FAC.get_html_bytes(
                self.DIALOG_GEN.get_html(
                    open(self.ROOT_PATH+self.path+".dialogue").read()
                )
            )
        )

    def _get_resp_file(self,path):
        return self._custom_get_resp(open(path,'rb').read())
    
    def _custom_get_resp(self,bytes):
        self.send_response(200)
        self.send_header("Content-type","text/html")
        self.end_headers()
        self.wfile.write(bytes)
        return
