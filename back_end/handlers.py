import http.server,re,urllib.parse,copy,json
from back_end import htmlFactory,gameHandlers

class MyHandlers(http.server.SimpleHTTPRequestHandler):

    ROOT_PATH = "./front_end/static"
    HTML_PATH = ROOT_PATH+"/html"
    HTML_FAC = htmlFactory.HtmlFac(
        open(HTML_PATH + "/head.html").read(),
        open(HTML_PATH + "/header.html").read(),
        open(HTML_PATH + "/footer.html").read()
    )
    BYTE_FORMAT = 'utf-8'
    GAME = gameHandlers.GameHandler()

    def do_GET(self):
        self._parse_resp(self._get_resp(),super().do_GET)

    def do_POST(self):
        self._parse_resp(self._post_resp(),super().do_GET)

    def _parse_resp(self,resp,default_resp):
        if resp != None:
            if re.match("^/",resp):
                return self._custom_redirect(resp)
            return self._custom_resp(bytes(resp,self.BYTE_FORMAT))
        return default_resp()
    
    def _get_resp(self):
        query_vals = self._get_query_vals(self.path)
        url = urllib.parse.unquote(self._remove_query_string(self.path))
        if self._is_root(url):
            return self._root_resp()
        elif self._is_story(url):
            return self._story_resp(url)
        elif self._is_game(url):
            return self.GAME.handle_get_req(url,query_vals,self._cookies())
        elif self.path == "/test":
            return self._test()
        return
    
    def _post_resp(self):
        if self._is_game(self.path):
            return self.GAME.handle_post_req(self.path,self._post_body(),self._cookies())
        return

    def _test(self):
        return "test"

    def _post_body(self):
        try:
            return json.loads(
                self.rfile.read(
                        int(self.headers['Content-Length'])
                    ).decode(self.BYTE_FORMAT)
                )
        except:
            return {}
            

    def _cookies(self):
        try:
            return {cookie.split('=')[0] : cookie.split('=')[1] 
                for cookie in self.headers["Cookie"].split('&')}
        except:
            return {}

    def _get_query_vals(self,path):
        return urllib.parse.parse_qs(urllib.parse.urlparse(path).query)

    def _remove_query_string(self,path):
        return path.split('?')[0]

    def _request_ip(self):
        return self.client_address[0]

    def _is_root(self,path):
        return path == "/"

    def _root_resp(self):
        return self.HTML_FAC.get_html_sting(open(self.HTML_PATH+"/index.html").read())

    def _story_resp(self,url):
        return self.HTML_FAC.get_html_sting(open(self.HTML_PATH+url+".html").read())

    def _is_game(self,path):
        return re.match("^/game.*",path)

    def _is_story(self,path):
        return re.match("^/story.*",path)

    def _custom_resp(self,bytes=bytes("",'utf-8')):
        self.send_response(200)
        self.send_header("Content-type","text/html")
        self.end_headers()
        self.wfile.write(bytes)
        return 

    def _custom_redirect(self,redirect_url):
        self.send_response(301)
        self.send_header('Location',redirect_url)
        self.end_headers()
        return 
        
