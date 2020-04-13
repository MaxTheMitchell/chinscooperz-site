import http.server,socketserver,os

PORT = int(os.getenv("PORT"))

class MyHandlers(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            return self.custom_get(None)
        return super().do_GET()
    
    def custom_get(self,path):
        self.send_response(200)
        self.send_header("Content-type","text/html")
        self.end_headers()
        self.wfile.write(open('./front_end/static/html/index.html','rb').read())
        return


with socketserver.TCPServer(("",PORT),MyHandlers) as httpd:
    print("on port localhost:{}".format(PORT))
    httpd.serve_forever()