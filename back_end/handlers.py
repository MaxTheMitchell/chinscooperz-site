import http.server,re,urllib.parse,os
from back_end import dialogueGenerator,htmlFactory,gameHandlers

class MyHandlers(http.server.SimpleHTTPRequestHandler):

    ROOT_PATH = "./front_end/static"
    HTML_PATH = ROOT_PATH+"/html"
    HTML_FAC = htmlFactory.HtmlFac(
        open(HTML_PATH + "/head.html").read(),
        open(HTML_PATH + "/header.html").read(),
        open(HTML_PATH + "/footer.html").read()
    )
    DIALOG_GEN = dialogueGenerator.dialogueGenerator(
        "/front_end/static/imgs/faces",
        {
            'magic_rat' : '#cc33ff',
            'nico' : '#ff4d4d',
            'danny' : '#6666cc'
        }
        )
    GAME = gameHandlers.GameHandler()

    def do_GET(self):
        resp_str = self._get_get_str(self.path)
        if resp_str != None:
            return self._custom_get_resp(bytes(resp_str,'utf-8'))
        return super().do_GET()

    def _get_get_str(self,path):
        if self._is_root(path):
            return self._root_resp()
        elif self._is_dialogue(path):
            return self._dialogue_resp(path)
        elif self._is_game(path):
            return self.GAME.handle_req(path,self._get_query_vals(path),self._request_ip())
        elif path == "/test":
            return self._test()


    def _test(self):
        return str(os.getenv("HTTP_X_FORWARDED_FOR"))+str(os.getenv("REMOTE_ADDR"))

    def _get_query_vals(self,path):
        return urllib.parse.parse_qs(urllib.parse.urlparse(path).query)

    def _request_ip(self):
        return self.client_address[0]

    def _is_root(self,path):
        return path == "/"

    def _root_resp(self):
        return self.HTML_FAC.get_html_sting(open(self.HTML_PATH+"/index.html").read())

    def _is_dialogue(self,path):
        return re.match('^/dialogue/.*',path)

    def _dialogue_resp(self,path):
        return self.HTML_FAC.get_html_sting(
            self.DIALOG_GEN.get_html(
                open(self.ROOT_PATH+self.path+".dialogue").read()
            )
        )

    def _is_game(self,path):
        return re.match("^/game.*",path)

    def _get_resp_file(self,path):
        return self._custom_get_resp(open(path,'rb').read())
    
    def _custom_get_resp(self,bytes=bytes("",'utf-8')):
        self.send_response(200)
        self.send_header("Content-type","text/html")
        self.end_headers()
        self.wfile.write(bytes)
        return
    
